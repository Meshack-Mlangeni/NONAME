using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class ChatDto
    {
        public ChatDto() { }
        public ChatDto(ChatHistory ch)
        {
            Id = ch.Id;
            Content = ch.Content;
            UserEmail = ch.UserEmail;
            TimeStamp = ch.TimeStamp;
            PostId = ch.PostId;
        }
        public int Id { get; set; }
        public string Content { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public int PostId { get; set; }
    }
}