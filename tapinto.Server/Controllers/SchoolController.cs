using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Helpers;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    public class SchoolController : BaseApiController<SchoolController>
    {
        public SchoolController(AppDbContext _context, ILogger<SchoolController> logger, UserManager<User> userManager) : base(_dbContext: _context, _logger: logger, _userManager: userManager) { }

        [AllowAnonymous]
        [HttpGet("getallschools")]
        public async Task<ActionResult> GetAllSchools()
        {
            logger.LogInformation("{0} - {1} FETCH SCHOOLS", DateTime.Now.ToLongDateString(), await User.Identity.EmailAsync(userManager));
            var response = new DataResponse<List<SchoolDto>>();
            var schools = await dbContext.Schools.Include(g => g.Groups).ToListAsync();

            if(schools == null){
                response.ResponseFailedWithMessage("Could Not Fetch Schools, Please Report Issue");
                return Ok(response);
            }

            var schoolsDto = schools.Select(s => new SchoolDto(s)
            {
                Groups = s.Groups.Select(g => new GroupDto(g)).ToArray(),
            }).ToList();
            response.ResponseSuccessWithMessage("Schools Fetched Successfully", data: schoolsDto);
            return Ok(response);
        }
    }
}