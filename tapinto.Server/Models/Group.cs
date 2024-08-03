using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string UserEmail { get; set; }
        public string Description { get; set; }
        public int SchoolId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public School School { get; set; }

        public ICollection<Membership> groupUserBridge { get; set; }
    }
}