using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.DataTransferObjects
{
    public class PollActivityDto
    {
        public int Id { get; set; }
        public int ActivityId { get; set; }
        public ActivityDto Activity { get; set; }
        public string UserEmail { get; set; }
        public bool chosenAnswerCorrect { get; set; } = false;
        public string SelectedAnswer { get; set; }
        public int SelectedAnswerId { get; set; }
        public PossibleAnswerDto PossibleAnswer { get; set; }
    }
}