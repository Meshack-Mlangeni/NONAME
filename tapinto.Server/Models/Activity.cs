using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Models
{
    public class Activity
    {
        public Activity(ActivityDto activity)
        {
            Id = activity.Id;
            Content = activity.ActivityContent;
            ActivityType = (ActivityType)activity.ActivityType;
            Timestamp = DateTime.UtcNow;
        }

        public Activity()
        { }

        [Key]
        public int Id { get; set; }

        public string UserEmail { get; set; }
        public string Content { get; set; }
        public ActivityType ActivityType { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int? GroupId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Group Group { get; set; }

        public ICollection<ChatHistory> Chats { get; set; }
        public ICollection<PossibleAnswer> Answers { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}