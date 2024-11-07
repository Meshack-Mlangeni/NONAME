using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tapinto.Server.Models
{
    public class Group
    {
        [Key]
        public int GroupId { get; set; }

        public string GroupName { get; set; }
        public string UserEmail { get; set; }
        public string Description { get; set; }
        [ForeignKey("School")]
        public int SchoolId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public School School { get; set; }

        public ICollection<Membership> groupUserBridge { get; set; }
    }
}