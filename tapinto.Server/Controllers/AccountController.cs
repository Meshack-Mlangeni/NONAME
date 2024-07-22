using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly ILogger<AccountController> _logger;
        private readonly AppDbContext context;
        private readonly UserManager<User> _userManager;
        private readonly AuthController _authController;

        public AccountController(ILogger<AccountController> logger, AppDbContext _context,
            UserManager<User> userManager, AuthController authController)
        {
            _logger = logger;
            context = _context;
            _userManager = userManager;
            _authController = authController;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Where(u => u.Email == loginDto.Email).FirstOrDefaultAsync();

            if (user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                var userDto = await GetUserDto(user);
                var token = await _authController.Auntheticate(user);
                userDto.Token = token.accessToken;

                return userDto;
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (user == null)
            {
                if (registerDto.Password == registerDto.ConfirmPassword)
                {
                    user = new User
                    {
                        Email = registerDto.Email,
                        FirstName = registerDto.FirstName,
                        LastName = registerDto.LastName,
                        UserName = registerDto.Email[0..3] + registerDto.FirstName + registerDto.LastName,
                        Verified = false,
                        Bio = "",
                        Rating = 0.0
                    };

                    var getSchool = context.Schools.ToList()
                    .FirstOrDefault(s => s.SchoolName == registerDto.SchoolName);
                    int SchoolId = getSchool?.Id ?? 0;
                    if (getSchool == null)
                    {
                        var newSchool = new School
                        {
                            SchoolName = registerDto.SchoolName + $" - Awaiting Approval",
                            UserEmail = registerDto.Email,
                        };
                        context.Schools.Add(newSchool);
                        if ((await context.SaveChangesAsync()) > 0)
                        {
                            SchoolId = context.Schools.FirstOrDefault(s => s.SchoolName == registerDto.SchoolName)?.Id ?? 0;
                        }
                    }
                    user.SchoolId = SchoolId;
                    var result = await _userManager.CreateAsync(user, registerDto.Password);

                    if (registerDto.RegisterAs == "Teacher" && registerDto.ImageData != null)
                    {
                        var teacherRequests = new TeacherRequests
                        {
                            Approved = false,
                            Timestamp = DateTime.Now,
                            UserEmail = user.Email,
                            Reason = "",
                            ImageData = registerDto.ImageData
                        };
                        await context.Requests.AddAsync(teacherRequests);
                        await context.SaveChangesAsync();
                    }

                    if (result.Succeeded)
                        if ((await _userManager.AddToRoleAsync(user, registerDto.RegisterAs)).Succeeded)
                        {
                            var userDto = await GetUserDto(
                                await _userManager.Users.Where(u => u.Email == registerDto.Email).FirstOrDefaultAsync()
                            );
                            var token = await _authController.Auntheticate(user);
                            userDto.Token = token.accessToken;
                            return userDto;
                        }

                    return Unauthorized();
                }
                else return BadRequest();
            }

            return BadRequest();
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userDto = await GetUserDto(user);
            var Token = await _authController.Auntheticate(user);
            userDto.Token = Token.accessToken;
            return userDto;
        }

        private async Task<UserDto> GetUserDto(User user)
        {
            var userSchool = await context.Schools.Where(u => u.Id == user.SchoolId).Select(x => x.SchoolName).FirstOrDefaultAsync();
            var groups = await context.Membership.Where(gu => gu.UserEmail == user.Email)
                .Include(o => o.Group)
                .Select(g => new GroupDto(g.Group) { SchoolName = userSchool })
                .ToArrayAsync();
            return new UserDto(user)
            {
                School = userSchool,
                Groups = groups
            };
        }
    }
}