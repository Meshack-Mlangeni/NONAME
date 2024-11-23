using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Helpers;
using tapinto.Server.Models;


namespace tapinto.Server.Services
{
    public class LiveHub : Hub
    {
        private ConcurrentDictionary<int, string[]> _joinedUsers = new ConcurrentDictionary<int, string[]>();
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
            //_joinedUsers.AddOrUpdate(discussionId, [.._joinedUsers.Values, userEmail]);
            if (user == null)
                return;
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            await Clients.Group(discussionId.ToString()).SendAsync("ReceiveMessage", $"{user.FirstName} {user.LastName}", $"{user.FirstName} {user.LastName} has joined");
        }

        //public async Task ReceiveMessage

        public async Task SendMessage(string message, string userEmail, int discussionId)
        {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null || message == null || discussionId == 0)
                return;
            var chatMessage = new ChatHistory
            {
                Content = message,
                ActivityId = discussionId,
                TimeStamp = DateTime.Now,
                UserEmail = userEmail,
                FullNames = user.FirstName + " " + user.LastName,
            };
            context.ChatHistory.Add(chatMessage);
            context.SaveChanges();

            new ContributionHelper(context, userEmail, ContributionHelper.contributionType.CommentedOnAPost).CreateContribution();
            await Clients.Group(discussionId.ToString())
            .SendAsync("ReceiveMessage", $"{user.FirstName} {user.LastName}", new ChatHistoryDto(chatMessage));
        }
    }
}