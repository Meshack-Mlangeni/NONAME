using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using tapinto.Server.Data;
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

        public async Task JoinChat()
        {
            await Clients.All.SendAsync("ReceiveMessage", "Mesh", "Mesh has joined chat");
        }
        public async Task JoinLiveDiscussion(string userEmail, int discussionId)
        {
           //await Clients.All.SendAsync("ReceiveMessage", "mesh", "mesh has joined0");
             await Groups.AddToGroupAsync("123", "MeshackGroup");
            await Clients.Group("MeshackGroup").SendAsync(method: "ReceiveMessage", arg1: "Mncedi", arg2: "This is the message");
        }

        public async Task SendMessage(string message){
            await Clients.Group("MeshackGroup")
            .SendAsync("ReceiveChatMessage", "Meshacx", message);
        }
    }
}