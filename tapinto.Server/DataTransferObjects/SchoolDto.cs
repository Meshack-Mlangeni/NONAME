using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class SchoolDto
    {
        public SchoolDto(School school)
        {
            SchoolId = school.SchoolId;
            SchoolName = school.SchoolName;
            UserEmail = school.UserEmail;
        }
        public SchoolDto()
        { }
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string UserEmail { get; set; }
        public GroupDto[] Groups { get; set; }
    }
}