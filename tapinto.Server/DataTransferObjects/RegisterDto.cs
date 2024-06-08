using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.DataTransferObjects
{
    public class RegisterDto: LoginDto
    {
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RegisterAs { get; set; }
        public string SchoolName { get; set; }
    }
}