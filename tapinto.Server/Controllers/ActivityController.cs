using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;
using tapinto.Server.HelperFunctions;
using System.Linq;

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
                //incr rating
                var group = context.Groups.FirstOrDefault(g => g.GroupName == post.GroupName);
                if (user != null && group != null)
                {
                    var newPost = new Post(post)
                    {
                        UserEmail = user.Email ?? "",
                        GroupId = group.Id,
                        Timestamp = DateTime.Now,
                    };
                    await context.Posts.AddAsync(newPost);
                    await context.SaveChangesAsync();
                    return Ok(post);
                }
                return BadRequest(post);
            }
            catch (Exception)
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
                var groupsUserIsIn = context.Membership.Where(gu => gu.UserEmail == user.Email)
                    .Include(g => g.Group).ToList();
                //var schoolUserIsIn = context.Schools.Where(school => user.SchoolId == school.Id).FirstOrDefault();

                var AllPostsFromGroupsUserIsIn = new List<Post>();
                context.Posts.ToList().ForEach(p =>
                {
                    if (groupsUserIsIn.Select(g => g.GroupId).Any(gr => gr == p.GroupId))
                    {
                        AllPostsFromGroupsUserIsIn.Add(p);
                    }
                });

                var PostDtos = AllPostsFromGroupsUserIsIn.Select((pp) => new PostDto(pp)
                {
                    GroupName = context.Groups.Where(g => g.Id == pp.GroupId).FirstOrDefault().GroupName,
                    UserFullNames = new HelperFunctions.HelperFunctions().GetFullNames(pp.UserEmail, userManager).Result,
                    Likes = context.Likes.Where(like => like.PostId == pp.Id)?.Count() ?? 0//to be changed
                }).ToList();
                return Ok(PostDtos.OrderByDescending(p => p.TimeStamp));
            }
            //var activityForUser = context.Posts.Where(p => p.go)
            return BadRequest();
        }


        [Authorize]
        [HttpGet("getallgroups")]
        public async Task<ActionResult<GroupDto>> GetAllGroups()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user != null)
            {
                var groupsInUsersSchool = context.Groups.Include(s => s.School).Where(g => g.SchoolId == user.SchoolId).Include(g => g.groupUserBridge).ToList();
                return Ok(groupsInUsersSchool.Select(g => new GroupDto(g)
                {
                    Users = g.groupUserBridge
                    .Select(ue => ue.UserEmail)
                    .Select(t => new UserDto(context.Users.FirstOrDefault(u => u.Email == t))).ToArray()
                }).ToList());
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPut("creategroup")]
        public async Task<ActionResult<GroupDto>> CreateGroupAsync(Group group)
        {
            var _group = group;
            if (_group.GroupName != "" && !context.Groups.Any(g => g.GroupName == group.GroupName))
            {
                var groupAdmin = await userManager.FindByNameAsync(User.Identity.Name);
                if (context.Groups.Where(g => g.UserEmail == groupAdmin.Email).ToList().Count <= 5)
                {
                    if (groupAdmin != null)
                    {
                        _group.UserEmail = groupAdmin.Email;
                        _group.SchoolId = groupAdmin.SchoolId;
                        context.Add(_group);
                        if (await context.SaveChangesAsync() > 0)
                        {
                            var membership = new Membership
                            {
                                UserEmail = groupAdmin.Email,
                                GroupId = (await context.Groups.FirstOrDefaultAsync(g => g.GroupName == group.GroupName)).Id,
                            };
                            context.Membership.Add(membership);
                            groupAdmin.Rating += 0.10;
                            await context.SaveChangesAsync();
                            await userManager.UpdateAsync(groupAdmin);
                            return Ok();
                        }
                        return BadRequest("Could not save changes to the database, please contact system administrator.");
                    }
                    else return BadRequest("Could find user, please contact system administrator.");
                }
                else return BadRequest("User must have a minimum of 5 group");
            }
            return BadRequest("Something went wrong, please try again.");
        }

        [HttpGet("getlabels")]
        public ActionResult GetLabels()
        {
            var labels = context.Labels.ToList();
            return Ok(labels);
        }

        [Authorize]
        [HttpPost("likeactivity")]
        public async Task<IActionResult> LikeActivity(int PostId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user != null)
            {
                var like = context.Likes.FirstOrDefault(l => l.UserEmail == user.Email);
                if (like == null)
                    context.Likes.Add(new Like
                    {
                        UserEmail = user.Email,
                        PostId = PostId
                    });
                else context.Likes.Remove(like);
                await context.SaveChangesAsync();
                return Ok();
            }
            else return BadRequest();
        }

    }
}
