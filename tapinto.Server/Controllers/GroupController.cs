using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Helpers;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    public class GroupController : BaseApiController<GroupController>
    {
        public const string USERACTIONJOINED = "JOINED";
        public const string USERACTIONEXITED = "EXITED";
        public GroupController(AppDbContext _context, ILogger<GroupController> logger, UserManager<User> userManager, IOptions<CloudinaryConfig> config)
        : base(_dbContext: _context, _logger: logger, _userManager: userManager)
        { }

        [Authorize]
        [HttpPut("joinexitgroup")]
        public async Task<ActionResult> JoinExitGroup(int groupId, string action)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var response = new DataResponse<GroupDto>();
            var group = dbContext.Groups.FirstOrDefault(g => g.GroupId == groupId);
            if (group == null || user == null)
            {
                response.ResponseFailedWithMessage("Error Joining Group, Please Report Issue.");
                return Ok(response);
            }
            string userAction = action == "j" ? USERACTIONJOINED : USERACTIONEXITED;
            logger.LogInformation("{0} - {1} {2} GROUP -> {3}", user.Email, DateTime.Now.ToLongDateString(), userAction.ToUpper(), group.GroupName);

            if (userAction == USERACTIONJOINED)
            {
                var membership = dbContext.Membership.FirstOrDefault(m => m.UserEmail == user.Email && m.GroupId == groupId);
                if (membership != null)
                {
                    response.ResponseFailedWithMessage("Something Went Wrong, Please Report Issue.");
                    return Ok(response);
                }
                membership = new Membership
                {
                    UserEmail = user.Email,
                    GroupId = groupId,
                };
                dbContext.Membership.Add(membership);
            }
            else
            {
                var membership = dbContext.Membership.FirstOrDefault(m => m.UserEmail == user.Email && m.GroupId == groupId);
                if (membership == null)
                {
                    response.ResponseFailedWithMessage("Something Went Wrong, Please Report Issue.");
                    return Ok(response);
                }
                dbContext.Membership.Remove(membership);
            }
            dbContext.SaveChanges();
            response.ResponseSuccessWithMessage($"You Have Successfully {userAction.ToTitleCase()} {group.GroupName}");
            return Ok(response);
        }

        [Authorize]
        [HttpGet("getallgroups")]
        public async Task<ActionResult> GetAllGroups()
        {
            logger.LogInformation("{0} - {1} FETCH GROUPS", DateTime.Now.ToLongDateString(), await User.Identity.EmailAsync(userManager));
            var response = new DataResponse<List<GroupDto>>();
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                response.ResponseFailedWithMessage("Could Not Fetch Groups, Please Report this Issue.");
                return Ok(response);
            }
            var groupsInUsersSchool = dbContext.Groups.Include(s => s.School).Where(g => g.SchoolId == user.SchoolId).Include(g => g.groupUserBridge).ToList();
            response.ResponseSuccessWithMessage("Successfully Fetched Groups", data: groupsInUsersSchool.Select(g => new GroupDto(g)
            {
                Users = g.groupUserBridge.Select(ue => ue.UserEmail).Select(t => new UserDto(dbContext.Users.FirstOrDefault(u => u.Email == t))).ToArray()
            }).ToList());
            return Ok(response);
        }

        [Authorize]
        [HttpPut("creategroup")]
        public async Task<ActionResult<GroupDto>> CreateGroup(Group group)
        {
            logger.LogInformation("{0} - {1} CREATING GROUP", DateTime.Now.ToLongDateString(), await User.Identity.EmailAsync(userManager));
            var response = new DataResponse<GroupDto>();
            var _group = group;
            var groupAdmin = await userManager.FindByNameAsync(User.Identity.Name);
            if (group == null && groupAdmin == null && _group.GroupName == "" && dbContext.Groups.Any(g => g.GroupName == group.GroupName))
            {
                response.ResponseFailedWithMessage("An Error Occured While Creating Group, Please Report This Issue");
                return Ok(response);
            }
            if (dbContext.Groups.Where(g => g.UserEmail == groupAdmin.Email).ToList().Count <= 10)
            {
                _group.UserEmail = groupAdmin.Email;
                _group.SchoolId = groupAdmin.SchoolId;
                dbContext.Add(_group);
                dbContext.SaveChanges();

                var membership = new Membership
                {
                    UserEmail = groupAdmin.Email,
                    GroupId = _group.GroupId,
                };
                dbContext.Membership.Add(membership);
                dbContext.SaveChanges();

                var contributionHelper = new ContributionHelper(dbContext, groupAdmin.Email, ContributionHelper.contributionType.CreatedAGroup);
                contributionHelper.CreateContribution();

                response.ResponseSuccessWithMessage("Group Added Successfully", data: new GroupDto(group));
                return Ok(response);
            }
            else
            {
                response.ResponseFailedWithMessage("You Have Reached Your Group Maximum");
                return Ok(response);
            }
        }

    }
}