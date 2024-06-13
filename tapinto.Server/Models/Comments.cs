using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        [ForeignKey("Post")]
        public int PostId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Post Post { get; set; }

    }
}