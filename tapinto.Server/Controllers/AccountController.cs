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
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            _logger.Log(LogLevel.Information, "Successfully registered!");

            await _userManager.AddToRoleAsync(user, registerDto.RegisterAs);

            return StatusCode(201);
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
            var groups = await context.GroupUsers.Where(gu => gu.UserEmail == user.Email)
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