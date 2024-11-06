using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tapinto.Server.Models
{
    public class ActivityImage
    {
        [Key]
        public int ImageId { get; set; }
        public string AbsoluteUrl { get; set; }

        [ForeignKey("Activity")]
        public int ActivityId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Activity Activity { get; set; }

        public string PublicId { get; set; }
    }
}