using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class GroupUserBridge
    {
        [Key]
        public int Id { get; set; }

        public string UserEmail { get; set; }

        [ForeignKey("Group")]
        public int? GroupId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Group Group { get; set; }
    }
}