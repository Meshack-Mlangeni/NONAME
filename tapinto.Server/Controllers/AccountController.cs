using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly RoleManager<IdentityRole> _roleManager;
        


        public AccountController(ILogger<AccountController> logger, AppDbContext _context,
            UserManager<User> userManager, AuthController authController , RoleManager<IdentityRole> roleManager)
        {
            _logger = logger;
            context = _context;
            _userManager = userManager;
            _authController = authController;
            _roleManager = roleManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _userManager.Users.Where(u => u.Email == loginDto.Email).FirstOrDefaultAsync();
            
            if(user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password)){
              
                var userDto = new UserDto( user);
                var token = await _authController.Auntheticate(user);
                userDto.Token = token.accessToken;
                
                return userDto;
            }

            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            //var user = new User{
            //    Email = registerDto.Email,
            //    FirstName = registerDto.FirstName,
            //    LastName = registerDto.LastName
            //};
            //var result = await userManager.CreateAsync(user, registerDto.Password);

            //if(result.Succeeded){
            //    foreach(var error in result.Errors){
            //        ModelState.AddModelError(error.Code, error.Description);
            //    }

            //    return ValidationProblem();
            //}

            //_logger.Log(LogLevel.Information, "Successfully registered!");

            //await userManager.AddToRoleAsync(user, registerDto.RegisterAs);

            return Ok();
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userDto = new UserDto( user);
            var Token = await _authController.Auntheticate(user);
            userDto.Token = Token.accessToken;
            return userDto;
        }

    }
}