using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class CommentsDto
    {
        public CommentsDto()
        { }

        public CommentsDto(Comments comment)
        {
            CommentId = comment.CommentId;
            CommentContent = comment.CommentContent;
            ActivityId = comment.ActivityId;
            UserEmail = comment.UserEmail;
            TimeStamp = comment.TimeStamp;
        }
        public int CommentId { get; set; }
        public string CommentContent { get; set; }
        public int ActivityId { get; set; }
        public string UserEmail { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Verified { get; set; }
        public string FullNames { get; set; }
    }
}