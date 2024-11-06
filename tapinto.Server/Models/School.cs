using System.ComponentModel.DataAnnotations;

namespace tapinto.Server.Models
{
    public class School
    {
        [Key]
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string UserEmail { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}