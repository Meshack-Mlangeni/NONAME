using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class GroupDto
    {
        public GroupDto(Group group)
        {
            GroupId = group.Id;   
            GroupName = group.GroupName;   
            UserEmail = group.UserEmail;   
        }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string UserEmail { get; set; }
        public string SchoolName { get; set; }
    }
}