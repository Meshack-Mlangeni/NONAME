using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Helpers
{
    public class ActivityBuilder
    {
        private ActivityDto activity { get; set; }
        private AppDbContext context;
        private UserManager<User> userManager;
        public ActivityBuilder(AppDbContext _context, UserManager<User> _userManager)
        {
            context = _context;
            userManager = _userManager;
            activity = new ActivityDto();
        }

        public ActivityBuilder HasImage(int id)
        {
            var image = context.ActivityImages.Where(g => g.ActivityId == id).FirstOrDefault();
            if (image == null) return this;
            activity.ImageUrl = image.AbsoluteUrl;
            return this;
        }

        public ActivityBuilder CheckIfUserLikedTheActivity(bool lultp)
        {
            activity.CurrentUserLiked = lultp;
            return this;
        }

        public ActivityBuilder AssignGroupActivityIsIn(int? id)
        {
            var group = context.Groups.Where(g => g.GroupId == id.Value).FirstOrDefault();
            if (group == null) return this;
            activity.GroupName = group.GroupName;
            return this;
        }

        public ActivityBuilder SetUpUserInfo(string email)
        {
            activity.UserFullNames = new HelperFunctions().GetFullNames(email, userManager).Result;
            activity.Verified = new HelperFunctions().GetVerification(email, userManager).Result;
            return this;
        }

        public ActivityBuilder SetupLikesAndCommentsCount(int id)
        {
            activity.Likes = context.Likes.Where(like => like.ActivityId == id)?.Count() ?? 0;
            activity.Comments = context.Comments.Where(c => c.ActivityId == id)?.Count() ?? 0;
            return this;
        }

        public ActivityBuilder ConfigActivity(Activity _activity)
        {
            activity.Id = _activity.Id;
            activity.ActivityContent = _activity.Content;
            activity.TimeStamp = _activity.Timestamp;
            activity.ActivityType = (int)_activity.ActivityType;
            activity.UserEmail = _activity.UserEmail;
            if (_activity.Answers != null) activity.Answers = _activity.Answers.Select(a => new PossibleAnswerDto(a)).ToArray();
            return this;
        }

        public ActivityDto BuildActivity()
        {
            return activity;
        }
    }
}