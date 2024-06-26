using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class PostDto
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int PostType { get; set; }
        public string PostContent { get; set; }
        public string UserEmail { get; set; }
        public int Upvotes { get; set; } = 0;
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public CommentsDto[] Comments { get; set; }
        public ChatHistory[] Chats { get; set; }
        public PossibleAnswer[] Answers { get; set; }
        public string Labels { get; set; }
    }
}