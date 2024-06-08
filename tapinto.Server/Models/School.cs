using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.Models
{
    public class School
    {
        public int Id { get; set; }
        public string SchoolName { get; set; }
        public string userEmail { get; set; } //admin

        public ICollection<Group> Groups { get; set; }

    }
}