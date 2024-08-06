using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.Models
{
    public class TeacherRequests
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string ImageData { get; set; }
        public bool Approved { get; set; }
        public string Reason { get; set; } = null;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}