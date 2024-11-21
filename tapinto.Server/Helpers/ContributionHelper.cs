using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Data;
using tapinto.Server.Models;

namespace tapinto.Server.Helpers
{
    public class ContributionHelper
    {
        public enum contributionType
        {
            CommentedOnAPost = 1,
            CreatedAGroup = 2,
            CreatedAnActivity = 3,
            CreatedADiscussion = 4,
            CreatedAPoll = 5,
            CreatedATest = 6
        }
        public static string userEmail { get; set; }
        public static contributionType ContributionType { get; set; }
        private static AppDbContext context;
        public ContributionHelper(AppDbContext _context, string _userEmail, contributionType contribution)
        {
            userEmail = _userEmail;
            ContributionType = contribution;
            context = _context;
        }

        public void CreateContribution()
        {
            var contr = context.Contributions.FirstOrDefault(c => c.UserEmail == userEmail
             && c.DateContributed.Date == DateTime.Now.Date);

            if (contr != null)
            {
                contr.ContributionRating += (int)ContributionType * 1.0;
                context.Contributions.Update(contr);
            }
            else
            {
                contr = new Contributions()
                {
                    UserEmail = userEmail,
                    DateContributed = DateTime.Now,
                    ContributionRating = 0.0d
                };
                context.Contributions.Add(contr);
                //context.SaveChanges();
            }
        }
    }
}