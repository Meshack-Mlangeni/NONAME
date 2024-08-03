using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class PostDto
    {
        public PostDto(Post post)
        {
            Id = post.Id;
            PostContent = post.Content;
            TimeStamp = post.Timestamp;
            Labels = post.Labels;
            PostType = (int)post.PostType;
            UserEmail = post.UserEmail;
        }
        public PostDto() { }
        public int Id { get; set; }
        public string GroupName { get; set; }
        public int PostType { get; set; }
        public string PostContent { get; set; }
        public string UserEmail { get; set; }
        public string UserFullNames { get; set; }
        public int Likes { get; set; }
        public DateTime TimeStamp { get; set; }
        public CommentsDto[] Comments { get; set; }
        public ChatHistory[] Chats { get; set; }
        public PossibleAnswer[] Answers { get; set; }
        public string Labels { get; set; }
    }
}