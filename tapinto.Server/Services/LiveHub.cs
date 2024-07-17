using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using tapinto.Server.Data;


namespace tapinto.Server.Services
{
    public class LiveHub(AppDbContext _context) : Hub
    {
        private readonly AppDbContext context = _context;
        public async Task JoinLiveDiscussion()
        {
            await Groups.AddToGroupAsync("123", "MeshackGroup");
            await Clients.Group("MeshackGroup").SendAsync(method: "ReceiveMessage", arg1: "Mncedi", arg2: "This is the message");
        }
    }
}