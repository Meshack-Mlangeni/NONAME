using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class PossibleAnswer
    {
        [Key]
        public int PossibleAnswerId { get; set; }
        public string Answer { get; set; }
        public bool isAnswer { get; set; }
        [ForeignKey("Activity")]
        public int ActivityId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Activity Activity { get; set; }
    }
}