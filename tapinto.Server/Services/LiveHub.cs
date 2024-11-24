using System.Collections.Concurrent;
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
        private static readonly ConcurrentDictionary<int, HashSet<string>> _joinedUsers = new ConcurrentDictionary<int, HashSet<string>>();
        private readonly AppDbContext context;
        private readonly UserManager<User> userManager;
        public LiveHub(AppDbContext _context, UserManager<User> _userManager)
        {
            userManager = _userManager;
            context = _context;
        }
        public async Task JoinLiveDiscussion(string userEmail, int discussionId)
        {
            if (userEmail == null)
                return;
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null) return;
            _joinedUsers.AddOrUpdate(discussionId, new HashSet<string> { user.FirstName + " " + user.LastName }, (key, existingVal) =>
            {
                existingVal.Add(user.FirstName + " " + user.LastName);
                return existingVal;
            });
            await Groups.AddToGroupAsync(Context.ConnectionId, discussionId.ToString());
            var participantList = _joinedUsers[discussionId].ToList();
            await Clients.Group(discussionId.ToString()).SendAsync("UpdateParticipants", participantList);
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