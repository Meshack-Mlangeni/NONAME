using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using static tapinto.Server.Helpers.ContributionHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Helpers;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    public class ActivityController : BaseApiController<ActivityController>
    {
        private readonly Cloudinary cloudinary;
        public ActivityController(AppDbContext _context, ILogger<ActivityController> logger, UserManager<User> userManager, IOptions<CloudinaryConfig> config)
        : base(_dbContext: _context, _logger: logger, _userManager: userManager)
        {
            cloudinary = new Cloudinary(new Account
            {
                ApiKey = config.Value.ApiKey,
                ApiSecret = config.Value.ApiSecret,
                Cloud = config.Value.CloudName,
            });
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> CreateAsync([FromForm] ActivityDto activity)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var response = new DataResponse<ActivityDto>();
            try
            {
                var group = dbContext.Groups.FirstOrDefault(g => g.GroupName == activity.GroupName);
                if (group == null && user == null)
                {
                    response.ResponseFailedWithMessage("User or Groups Not Found, Report Issue.");
                    return Ok(response);
                }
                logger.LogInformation("{0} - {1} CREATING ACTIVITY", user.Email, DateTime.Now.ToLongDateString());

                ImageUploadResult imageUploadResults = null;
                var newActivity = new Activity(activity)
                {
                    UserEmail = user.Email,
                    GroupId = group.GroupId,
                    Timestamp = DateTime.Now,
                };
                await dbContext.Activity.AddAsync(newActivity);
                dbContext.SaveChanges();

                if (activity.Answers != null)
                {
                    activity.Answers.ToList().ForEach(answer =>
                       {
                           dbContext.PossibleAnswers.Add(new PossibleAnswer
                           {
                               Answer = answer.Answer,
                               isAnswer = answer.isAnswer,
                               ActivityId = newActivity.Id,
                           });
                           dbContext.SaveChanges();
                       });
                }

                if (HelperFunctions.activityHasImageFile(activity))
                {
                    await using var image_stream = activity.File.OpenReadStream();
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(activity.File.Name, image_stream)
                    };
                    imageUploadResults = await cloudinary.UploadAsync(uploadParams);
                }

                if (HelperFunctions.imageUploadSuccessful(imageUploadResults))
                {
                    var image = new ActivityImage
                    {
                        ActivityId = newActivity.Id,
                        AbsoluteUrl = imageUploadResults.SecureUrl.ToString(),
                        PublicId = imageUploadResults.PublicId
                    };
                    dbContext.ActivityImages.Add(image);
                    dbContext.SaveChanges();
                }

                var _contributionType = (activity.ActivityType == (int)ActivityType.Activity) ? contributionType.CreatedAnActivity :
                                        (activity.ActivityType == (int)ActivityType.Discussion) ? contributionType.CreatedADiscussion :
                                        contributionType.CreatedAPoll;
                var contributionHelper = new ContributionHelper(dbContext, user.Email, _contributionType);
                contributionHelper.CreateContribution();

                response.ResponseSuccessWithMessage("Activity Added Successfully",
                    data: new ActivityBuilder(dbContext, userManager)
                        .ConfigActivity(newActivity)
                        .HasImage(id: newActivity.Id)
                        .AssignGroupActivityIsIn(id: newActivity.GroupId)
                        .SetUpUserInfo(email: user.Email)
                        .SetupLikesAndCommentsCount(id: newActivity.Id)
                        .CheckIfUserLikedTheActivity(lultp: newActivity.Likes != null
                                    && newActivity.Likes.Any(p => p.UserEmail == user.Email))
                        .BuildActivity());
                return Ok(response);
            }
            catch (Exception e)
            {
                response.ResponseFailedWithMessage(e.Message);
                return Ok(response);
            }
        }

        [Authorize]
        [HttpGet("getall")]
        public async Task<ActionResult<List<ActivityDto>>> GetAllActivities(int skip) //offset is skip
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var response = new DataResponse<List<ActivityDto>>();
            if (user == null)
            {
                response.ResponseFailedWithMessage("Could Find User, Please Report Issue");
                return Ok(response);
            }
            logger.LogInformation("{0} - {1} FETCH ACTIVITIES", DateTime.Now.ToLongDateString(), user.Email);
            var groupsUserIsIn = dbContext.Membership.Where(gu => gu.UserEmail == user.Email)
                .Include(g => g.Group).ToList();

            List<ActivityDto> ActivityDto = new List<ActivityDto>();
            var allActivities = dbContext.Activity.OrderByDescending(a => a.Timestamp).Include(l => l.Likes).ToList();
            foreach (var activity in allActivities)
            {
                if (groupsUserIsIn.Select(g => g.GroupId).Any(gr => gr == activity.GroupId))
                {
                    var activityDto = new ActivityBuilder(dbContext, userManager)
                        .ConfigActivity(activity)
                        .HasImage(id: activity.Id)
                        .AssignGroupActivityIsIn(id: activity.GroupId)
                        .SetUpUserInfo(email: activity.UserEmail)
                        .SetupLikesAndCommentsCount(id: activity.Id)
                        .CheckIfUserLikedTheActivity(lultp: activity.Likes != null
                                    && activity.Likes.Any(p => p.UserEmail == user.Email))
                        .BuildActivity();
                    ActivityDto.Add(activityDto);
                }
            }
            response.ResponseSuccessWithMessage("Successfully Fetched Activities", data: ActivityDto.Skip(skip - 5).Take(5).ToList());
            return Ok(response);
        }

        [Authorize]
        [HttpGet("getsingleactivity")]
        public async Task<IActionResult> GetSingleActivity(int activityId)
        {
            var response = new DataResponse<ActivityDto>();
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (activityId <= 0 || user == null)
            {
                response.ResponseFailedWithMessage("Error Fetching Activity, Please Report Issue");
                return Ok(response);
            }
            logger.LogInformation("{0} - {1} FETCH ACTIVITY", DateTime.Now.ToLongDateString(), user.Email);

            var activity = dbContext.Activity.Find(activityId);
            var activityDto = new ActivityBuilder(dbContext, userManager)
                        .ConfigActivity(activity)
                        .HasImage(id: activity.Id)
                        .AssignGroupActivityIsIn(id: activity.GroupId)
                        .SetUpUserInfo(email: activity.UserEmail)
                        .SetupLikesAndCommentsCount(id: activity.Id)
                        .CheckIfUserLikedTheActivity(lultp: activity.Likes != null
                                    && activity.Likes.Any(p => p.UserEmail == user.Email))
                        .BuildActivity();
            response.ResponseSuccessWithMessage("Successfully Fetched Single Activity", data: activityDto);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("likeactivity")]
        public async Task<IActionResult> LikeActivity(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var response = new DataResponse<Like>();
            if (user == null)
            {
                response.ResponseFailedWithMessage("Could Not Find User, Please Report This Issue.");
                return Ok(response);
            }
            logger.LogInformation("{0} - {1} LIKED ACTIVITY WITH ID: {2}", DateTime.Now.ToLongDateString(), user.Email, id);
            var like = dbContext.Likes.FirstOrDefault(l => l.UserEmail == user.Email && l.ActivityId == id);
            if (like == null)
            {
                dbContext.Likes.Add(new Like
                {
                    UserEmail = user.Email,
                    ActivityId = id
                });
            }
            else
            {
                dbContext.Likes.Remove(like);
            }
            dbContext.SaveChanges();
            response.ResponseSuccessWithMessage("Like For Post Changed Successfully", data: like ?? new Like() { ActivityId = id, UserEmail = user.Email });
            return Ok(response);
        }

        [Authorize]
        [HttpPut("comment")]
        public async Task<IActionResult> CommentOnActivity(CommentsDto comment)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var response = new DataResponse<List<CommentsDto>>();
            if (user == null)
            {
                response.ResponseFailedWithMessage("Could Not Find User, Please Report This Issue.");
                return Ok(response);
            }
            logger.LogInformation("{0} - {1} COMMENTED ON ACTIVITY WITH ID: {2}", DateTime.Now.ToLongDateString(), user.Email, comment.ActivityId);
            var Comment = new Comments
            {
                CommentContent = comment.CommentContent,
                ActivityId = comment.ActivityId,
                TimeStamp = DateTime.Now,
                UserEmail = user.Email
            };
            dbContext.Comments.Add(Comment);
            dbContext.SaveChanges();

            var getAllCommentsWithNewOnes = await dbContext.Comments.Where(c => c.ActivityId == comment.ActivityId).ToListAsync();
            response.ResponseSuccessWithMessage("Comment On Activity Successful.",
            data: getAllCommentsWithNewOnes.Select(c => new CommentsDto(c)
            {
                FullNames = new HelperFunctions().GetFullNames(c.UserEmail, userManager).Result
            }).OrderByDescending(d => d.TimeStamp).ToList());
            return Ok(response);
        }

        [Authorize]
        [HttpGet("getcomments")]
        public async Task<IActionResult> GetAllActivityComments(int id)
        {
            logger.LogInformation("{0} - {1} FETCH COMMENTS FOR ACTIVITY WITH ID: {2}", DateTime.Now.ToLongDateString(), await User.Identity.EmailAsync(userManager), id);
            var response = new DataResponse<List<CommentsDto>>();
            if (id == 0)
            {
                response.ResponseFailedWithMessage("Could Not Fetch Activity Comments, Please Report This Issue.");
                return Ok(response);
            }

            var allComments = dbContext.Comments.Where(c => c.ActivityId == id);
            List<CommentsDto> comments = new List<CommentsDto>();
            foreach (var comment in allComments)
            {
                var user = await userManager.FindByEmailAsync(comment.UserEmail);
                if (user == null) continue;
                comments.Add(new CommentsDto(comment)
                {
                    Verified = user.Verified,
                    FullNames = user.FirstName + " " + user.LastName,
                });
            }
            response.ResponseSuccessWithMessage("Comments Fetched Successfully", data: comments.OrderByDescending(c => c.TimeStamp).ToList());
            return Ok(response);
        }

        [Authorize]
        [HttpGet("getchathistory")]
        public IActionResult GetActivityChatHistory(int activityId)
        {
            logger.LogInformation("{0} - FETCHING CHAT HISTORY FOR ACTIVITY : {1}", DateTime.Now.ToLongDateString(), activityId);
            var response = new DataResponse<List<ChatHistoryDto>>();

            if (activityId <= 0)
            {
                response.ResponseFailedWithMessage("An Error Occurred, Please Report This Issue");
                return Ok(response);
            }

            var allChatHistory = dbContext.ChatHistory.Where(c => c.ActivityId == activityId).ToList();
            var allChatsDto = allChatHistory.OrderByDescending(c => c.TimeStamp).Select(c => new ChatHistoryDto(c)).ToList();
            response.ResponseSuccessWithMessage("Successfully Fetched Past Discussions", data: allChatsDto);
            return Ok(response);
        }
    }
}