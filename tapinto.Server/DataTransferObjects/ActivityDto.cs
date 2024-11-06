using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class ActivityDto
    {
        public ActivityDto(Activity activity)
        {
            Id = activity.Id;
            ActivityContent = activity.Content;
            TimeStamp = activity.Timestamp;
            ActivityType = (int)activity.ActivityType;
            UserEmail = activity.UserEmail;
        }

        public ActivityDto()
        { }

        public int Id { get; set; }
        public string GroupName { get; set; }
        public int ActivityType { get; set; }
        public string ActivityContent { get; set; }
        public string UserEmail { get; set; }
        public string UserFullNames { get; set; }
        public int Likes { get; set; }
        public DateTime TimeStamp { get; set; }
        public int Comments { get; set; }
        public ChatHistory[] Chats { get; set; }
        public PossibleAnswerDto[] Answers { get; set; }
        public bool CurrentUserLiked { get; set; } = false;
        public bool Verified { get; set; }
        public string ImageUrl { get; set; }
        public IFormFile File { get; set; }
    }
}