using System.ComponentModel.DataAnnotations;

namespace tapinto.Server.Models
{
    public class School
    {
        [Key]
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string UserEmail { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string MunicipalityName { get; set; }
        public string StreetAddress { get; set; }
        public string PostalAddress { get; set; }
        public string Telephone { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}