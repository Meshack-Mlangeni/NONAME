using System.ComponentModel.DataAnnotations;

namespace tapinto.Server.Models
{
    public class TeacherRequests
    {
        [Key]
        public int TeacherRequestId { get; set; }
        public string UserEmail { get; set; }
        public string ImageData { get; set; }
        public bool Approved { get; set; }
        public string Reason { get; set; } = null;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}