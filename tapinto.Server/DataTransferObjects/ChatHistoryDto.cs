using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class ChatHistoryDto
    {
        public ChatHistoryDto(ChatHistory chat)
        {
            ChatHistoryId = chat.ChatHistoryId;
            Content = chat.Content;
            UserEmail = chat.UserEmail;
            FullNames = chat.FullNames;
            TimeStamp = chat.TimeStamp;
            ActivityId = chat.ActivityId;
        }
        public int ChatHistoryId { get; set; }
        public string Content { get; set; }
        public string UserEmail { get; set; }
        public string FullNames { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public int ActivityId { get; set; }
    }
}