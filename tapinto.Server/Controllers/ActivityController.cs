using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;
using tapinto.Server.HelperFunctions;

namespace tapinto.Server.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly AppDbContext context;
        private readonly UserManager<User> userManager;

        public ActivityController(AppDbContext _context, UserManager<User> _userManager)
        {
            context = _context;
            userManager = _userManager;
        }

        [Authorize]
        [HttpPut("create")]
        public async Task<ActionResult<PostDto>> CreateAsync(PostDto post)
        {
            try
            {
                var user = await userManager.FindByNameAsync(User.Identity.Name);
                var group = context.Groups.FirstOrDefault(g => g.GroupName == post.GroupName);
                if (user != null && group != null)
                {
                    var newPost = new Post(post)
                    {
                        UserEmail = user.Email ?? "",
                        GroupId = group.Id,
                        Timestamp = DateTime.Now
                    };
                    await context.Posts.AddAsync(newPost);
                    await context.SaveChangesAsync();
                    return Ok(post);
                }
                return BadRequest(post);
            }
            catch (Exception e)
            {
                return BadRequest(post);
            }
        }
        [Authorize]
        [HttpGet("getall")]
        public async Task<ActionResult<PostDto>> getAllActivity()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user != null)
            {
                var groupsUserIsIn = context.GroupUsers.Where(gu => gu.UserEmail == user.Email)
                    .Include(g => g.Group).ToList();
                //var schoolUserIsIn = context.Schools.Where(school => user.SchoolId == school.Id).FirstOrDefault();
                var AllPosts = context.Posts.Where(p => groupsUserIsIn.Select(gug => gug.GroupId)
                .Any(gug => gug == p.GroupId));
                var PostDtos = AllPosts.Select((pp) => new PostDto(pp)
                {
                    GroupName = context.Groups.Where(g => g.Id == pp.GroupId).FirstOrDefault().GroupName,
                    UserFullNames = new HelperFunctions.HelperFunctions().GetFullNames(pp.UserEmail, userManager).Result,
                    Upvotes = 57//to be changed
                }).ToList();
                return Ok(PostDtos.OrderBy(p => p.TimeStamp));
            }
            //var activityForUser = context.Posts.Where(p => p.go)
            return BadRequest();
        }

        [HttpGet("getlabels")]
        public ActionResult GetLabels()
        {
            var labels = context.Labels.ToList();
            return Ok(labels);
        }

    }
}
