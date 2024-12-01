using CloudinaryDotNet;
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
    public class AccountController : BaseApiController<AccountController>
    {
        private readonly AuthController _authController;
        private readonly Cloudinary cloudinary;

        public AccountController(ILogger<AccountController> logger, AppDbContext _context,
            UserManager<User> userManager, AuthController authController, IOptions<CloudinaryConfig> options)
            : base(_dbContext: _context, _logger: logger, _userManager: userManager)
        {
            _authController = authController;
            cloudinary = new Cloudinary(new Account
            {
                ApiKey = options.Value.ApiKey,
                ApiSecret = options.Value.ApiSecret,
                Cloud = options.Value.CloudName,
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            logger.LogInformation("{0} - {1} ATTEMPTED LOGIN", DateTime.Now.ToLongDateString(), loginDto.Email);
            var response = new DataResponse<UserDto>();
            var user = await userManager.Users.Where(u => u.Email == loginDto.Email).FirstOrDefaultAsync();
            if (user != null && await userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                var userDto = await GetUserDto(user);
                var token = await _authController.Authenticate(user);
                userDto.Token = token.accessToken;
                response.ResponseSuccessWithMessage("Successfully signed in", data: userDto);
                return Ok(response);
            }
            response.ResponseFailedWithMessage("Couldn't sign in, please check password or email");
            return Unauthorized(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            logger.LogInformation("{0} - {1} ATTEMPTED REGISTER", DateTime.Now.ToLongDateString(), registerDto.Email);
            var response = new DataResponse<UserDto>();
            var user = await userManager.FindByEmailAsync(registerDto.Email);
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

                    var getSchool = dbContext.Schools.FirstOrDefault(s => s.SchoolName == registerDto.SchoolName || s.SchoolName == registerDto.SchoolName + $" - Awaiting Approval");
                    if (getSchool == null)
                    {
                        var newSchool = new School
                        {
                            SchoolName = registerDto.SchoolName + $" - Awaiting Approval",
                            UserEmail = registerDto.Email,
                        };
                        dbContext.Schools.Add(newSchool);
                        await dbContext.SaveChangesAsync();
                    }
                    getSchool = dbContext.Schools
                    .FirstOrDefault(s => s.SchoolName == registerDto.SchoolName || s.SchoolName == registerDto.SchoolName + $" - Awaiting Approval");
                    user.SchoolId = getSchool?.SchoolId ?? 0;
                    var result = await userManager.CreateAsync(user, registerDto.Password);
                    if (result.Succeeded)
                        if ((await userManager.AddToRoleAsync(user, "Student")).Succeeded)
                        {
                            var userDto = await GetUserDto(
                                await userManager.Users.Where(u => u.Email == registerDto.Email).FirstOrDefaultAsync()
                            );
                            var token = await _authController.Authenticate(user);
                            userDto.Token = token.accessToken;
                            response.ResponseSuccessWithMessage("User Successully created", userDto);
                            return Ok(response);
                        }

                    response.ResponseFailedWithMessage("Unautorized Access, Please contact system administrator");
                    return Unauthorized(response);
                }
                else
                {
                    response.ResponseFailedWithMessage("Error registering user, please contact administrator");
                    return Ok(response);
                };
            }
            response.ResponseFailedWithMessage("Error registering user, please contact administrator");
            return Ok(response);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            logger.LogInformation("{0} - {1} REFRESHED TOKEN", DateTime.Now.ToLongDateString(), await User.Identity.EmailAsync(userManager));
            var response = new DataResponse<UserDto>();
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var userDto = await GetUserDto(user);
            var Token = await _authController.Authenticate(user);
            userDto.Token = Token.accessToken;
            response.ResponseSuccessWithMessage($"Welcome back {userDto.FirstName}", userDto);
            return Ok(response);
        }

        private async Task<UserDto> GetUserDto(User user)
        {
            var userSchool = await dbContext.Schools.Where(u => u.SchoolId == user.SchoolId).Select(x => x.SchoolName).FirstOrDefaultAsync();
            var groups = await dbContext.Membership.Where(gu => gu.UserEmail == user.Email)
                .Include(o => o.Group)
                .Select(g => new GroupDto(g.Group) { SchoolName = userSchool })
                .ToArrayAsync();
            var numberOfPosts = dbContext.Activity.Where(p => p.UserEmail == user.Email).Count();
            return new UserDto(user)
            {
                School = userSchool,
                Groups = groups,
                NumberOfActivities = numberOfPosts,
            };
        }
    }
}