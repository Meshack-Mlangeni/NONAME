using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;


namespace tapinto.Server.Services
{
    public class LiveHub : Hub
    {
        private readonly AppDbContext context;
        private readonly UserManager<User> userManager;
        public LiveHub(AppDbContext _context, UserManager<User> _userManager)
        {
            userManager = _userManager;
            context = _context;
        }
        public async Task JoinLiveDiscussion(string userEmail, int discussionId)
        {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null)
                return;
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Group(discussionId.ToString()).SendAsync("ReceiveMessage", $"{user.FirstName} {user.LastName}", $"{user.FirstName} {user.LastName} has joined");
        }

        public async Task SendMessage(string message, string userEmail, int discussionId)
        {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null || message == null || discussionId == 0)
                return;
            var chatMessage = new ChatHistory
            {
                Content = message,
                PostId = discussionId,
                TimeStamp = DateTime.Now,
                UserEmail = userEmail,
                FullNames = user.FirstName + " " + user.LastName,
            };
            context.ChatHistory.Add(chatMessage);
            context.SaveChanges();
            user.Rating += 0.02;
            await userManager.UpdateAsync(user);

            var dummy = Clients.Group(discussionId.ToString());

            await Clients.OthersInGroup(discussionId.ToString())
            .SendAsync("ReceiveMessage", $"{user.FirstName} {user.LastName}", new ChatDto(chatMessage));

            //await Clients.Group(discussionId.ToString())
            //.SendAsync("ReceiveMessage", $"{user.FirstName} {user.LastName}", new ChatDto(chatMessage));
            //The UserEmail = $"{user.FirstName} {user.LastName}" is to override the email and use the users first and last name instead
        }
    }
}