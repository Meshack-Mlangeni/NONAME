using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Models
{
    public class PollActivity
    {

        public PollActivity(PollActivityDto pollActivity)
        {
            Id = pollActivity.Id;
            ActivityId = pollActivity.ActivityId;
            UserEmail = pollActivity.UserEmail;
            SelectedAnswerId = pollActivity.SelectedAnswerId;
        }
        public PollActivity()
        {

        }
        public int Id { get; set; }
        [ForeignKey("Activity")]
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
        public string UserEmail { get; set; }

        [ForeignKey("PossibleAnswer")]
        public int SelectedAnswerId { get; set; }
        public PossibleAnswer PossibleAnswer { get; set; }
    }
}