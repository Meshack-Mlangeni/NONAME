using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class ChatHistory
    {
        [Key]
        public int ChatHistoryId { get; set; }
        public string Content { get; set; }
        public string UserEmail { get; set; }
        public string FullNames { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        [ForeignKey("Activity")]
        public int ActivityId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Activity Activity { get; set; }
    }
}