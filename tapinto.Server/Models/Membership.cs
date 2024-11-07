using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tapinto.Server.Models
{
    public class Membership
    {
        [Key]
        public int MembershipId { get; set; }
        public string UserEmail { get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Group Group { get; set; }
    }
}