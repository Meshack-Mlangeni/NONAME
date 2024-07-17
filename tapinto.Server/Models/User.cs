using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace tapinto.Server.Models
{
    public class User: IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SchoolId { get; set; }
        public bool Verified { get; set; }
        public string Bio { get; set; } = null;
        public double Rating { get; set; } = 0.0;
    }
}