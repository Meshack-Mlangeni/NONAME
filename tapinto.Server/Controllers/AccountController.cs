using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly UserManager<User> userManager;

        public AccountController(ILogger<AccountController> logger, AppDbContext _context, UserManager<User> _userManager)
        {
            _logger = logger;
            context = _context;
            userManager = _userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = userManager.Users.Where(u => u.Email == loginDto.Email).FirstOrDefaultAsync();
            if(user != null){
                return new UserDto(await user);
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto registerDto)
        {
            _logger.Log(LogLevel.Information, "Successfully registered!");
            return Ok();
        }

    }
}