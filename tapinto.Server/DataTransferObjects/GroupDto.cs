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
            SchoolId = group.SchoolId;   
        }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string UserEmail { get; set; }
        public int SchoolId { get; set; }
    }
}