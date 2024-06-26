using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class Like
    {
        public int Id { get; set; } 
        public string UserEmail { get; set; }
        public int PostId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Post Post { get; set; }
    }
}