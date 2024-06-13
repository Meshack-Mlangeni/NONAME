using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.DataTransferObjects
{
    public class PostDto
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public PostType PostType { get; set; }
        public string PostContent { get; set; }
        public string UserEmail { get; set; }
        public int Upvotes { get; set; }
        public DateTime TimeStamp { get; set; }
        public CommentsDto[] Comments { get; set; }
    }
}