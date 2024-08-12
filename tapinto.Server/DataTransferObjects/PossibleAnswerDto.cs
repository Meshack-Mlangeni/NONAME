using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Models;

namespace tapinto.Server.DataTransferObjects
{
    public class PossibleAnswerDto
    {
        public PossibleAnswerDto(){}
        public PossibleAnswerDto(PossibleAnswer answer)
        {
            Id = answer.Id;
            Answer = answer.Answer;
            isAnswer = answer.isAnswer;
            PostId = answer.PostId;
            Post = new PostDto(answer.Post);
        }

        public int Id { get; set; }
        public string Answer { get; set; }
        public bool isAnswer { get; set; }
        public int PostId { get; set; }
        public PostDto Post { get; set; }
    }
}