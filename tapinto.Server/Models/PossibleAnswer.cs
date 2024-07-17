using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace tapinto.Server.Models
{
    public class PossibleAnswer
    {
        public int Id { get; set; }
        public string Answer { get; set; }
        public bool isAnswer { get; set; }
        public int PostId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Post Post { get; set; }
    }
}