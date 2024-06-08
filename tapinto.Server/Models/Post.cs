using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public string userEmail { get; set; }
        public string PostContent { get; set; }
        public string Labels { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int GroupId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Group Group { get; set; }
        
    }
}