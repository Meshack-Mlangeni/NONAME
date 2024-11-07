using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tapinto.Server.Models
{
    public class Like
    {
        [Key]
        public int LikeId { get; set; }
        public string UserEmail { get; set; }
        [ForeignKey("Activity")]
        public int ActivityId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Activity Activity { get; set; }
    }
}