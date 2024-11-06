using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class GroupDto
    {
        public GroupDto(Group group)
        {
            GroupId = group.GroupId;
            GroupName = group.GroupName;
            UserEmail = group.UserEmail;
            if (group.School != null)
                SchoolName = group.School.SchoolName;
        }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string UserEmail { get; set; }
        public string SchoolName { get; set; }
        public string Description { get; set; }
        public UserDto[] Users { get; set; }
    }
}