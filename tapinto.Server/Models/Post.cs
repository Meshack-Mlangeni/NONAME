using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Models
{
    public class Post
    {
        public Post(PostDto post)
        {
            Id = post.Id;
            Content = post.PostContent;
            Labels = post.Labels;
            PostType = (PostType)post.PostType;
            Timestamp = DateTime.UtcNow;
        }
        public Post() { }
        [Key]
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string Content { get; set; }
        public string Labels { get; set; }
        public PostType PostType { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int? GroupId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Group Group { get; set; }

        public ICollection<ChatHistory> Chats { get; set; }
        public ICollection<PossibleAnswer> Answers { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}