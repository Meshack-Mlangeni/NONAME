using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class PossibleAnswerDto
    {
        public PossibleAnswerDto()
        { }
        public PossibleAnswerDto(PossibleAnswer answer)
        {
            PossibleAnswerId = answer.PossibleAnswerId;
            Answer = answer.Answer;
            isAnswer = answer.isAnswer;
            ActivityId = answer.ActivityId;
            Activity = new ActivityDto(answer.Activity);
        }
        public int PossibleAnswerId { get; set; }
        public string Answer { get; set; }
        public bool isAnswer { get; set; }
        public int ActivityId { get; set; }
        public ActivityDto Activity { get; set; }
    }
}