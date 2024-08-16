using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    public class SchoolController : BaseApiController
    {
        private readonly AppDbContext context;
        public readonly UserManager<User> userManager;

        public SchoolController(AppDbContext _appDbContext, UserManager<User> _userManager)
        {
            userManager = _userManager;
            context = _appDbContext;
        }

        [AllowAnonymous]
        [HttpGet("getallschools")]
        public ActionResult<SchoolDto> GetAllSchools()
        {
            var schools = context.Schools.Include(g => g.Groups).ToList();
            return Ok(schools.Select(s => new SchoolDto(s)
            {
                Groups = s.Groups.Select(g => new GroupDto(g)).ToArray(),
                Users = context.Users.Where(u => u.SchoolId == s.Id).Select(user => new UserDto(user)).ToArray()
            }));
        }

        [Authorize]
        [HttpGet("getuserschool")]
        public async Task<IActionResult> GetUserSchool()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user != null)
            {
                var school = context.Schools.Include(g => g.Groups).FirstOrDefault(u => u.UserEmail == user.Email);
                return Ok(new SchoolDto(school)
                {
                    Groups = school.Groups.Select(g => new GroupDto(g)).ToArray(),
                    Users = context.Users.Where(u => u.SchoolId == school.Id).Select(user => new UserDto(user)).ToArray()
                });
            }
            return BadRequest();
        }
    }
}