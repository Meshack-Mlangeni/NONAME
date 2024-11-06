using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class UserDto
    {
        public UserDto(User user)
        {
            UserId = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Bio = user.Bio;
            Verified = user.Verified;
        }

        public UserDto()
        { }

        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string School { get; set; }
        public string Bio { get; set; }
        public bool Verified { get; set; }
        public GroupDto[] Groups { get; set; }
        public int NumberOfActivities { get; set; }
    }
}