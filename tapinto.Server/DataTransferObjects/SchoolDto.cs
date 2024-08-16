using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class SchoolDto
    {
        public SchoolDto(School school)
        {
            Id = school.Id;
            SchoolName = school.SchoolName;
            UserEmail = school.UserEmail;
        }
        public SchoolDto()
        { }

        public int Id { get; set; }
        public string SchoolName { get; set; }
        public string UserEmail { get; set; } //admin

        public GroupDto[] Groups { get; set; }
        public UserDto[] Users { get; set; }
    }
}