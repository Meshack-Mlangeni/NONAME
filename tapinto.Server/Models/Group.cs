using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string userEmail { get; set; }
        public int SchoolId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public School School { get; set; }

        public ICollection<GroupUserBridge> groupUserBridge { get; set; }
    }
}