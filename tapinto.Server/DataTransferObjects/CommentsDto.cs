using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.DataTransferObjects
{
    public class CommentsDto
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}