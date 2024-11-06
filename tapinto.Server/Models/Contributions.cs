using System.ComponentModel.DataAnnotations;

namespace tapinto.Server.Models
{
    public class Contributions
    {
        [Key]
        public int ContributionsId { get; set; }
        public DateTime DateContributed { get; set; }
        public double ContributionRating { get; set; } = 0;
        public string UserEmail { get; set; }

    }
}