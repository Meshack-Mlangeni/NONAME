using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class CommentsDto
    {
        public CommentsDto() { }
        public CommentsDto(Comments comment)
        {
            Id = comment.Id;
            CommentContent = comment.CommentContent;
            PostId = comment.PostId;
            UserEmail = comment.UserEmail;
            TimeStamp = comment.TimeStamp;
        }
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public int PostId { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Verified { get; set; }
        public string FullNames { get; set; }
    }
}