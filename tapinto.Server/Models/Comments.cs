using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tapinto.Server.Models
{
    public class Comments
    {
        [Key]
        public int CommentId { get; set; }
        public string CommentContent { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        [ForeignKey("Activity")]
        public int ActivityId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Activity Activity { get; set; }
    }
}