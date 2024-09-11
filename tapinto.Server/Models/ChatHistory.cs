using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class ChatHistory
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string UserEmail { get; set; }
        public string FullNames { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public int PostId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Post Post { get; set; }
    }
}