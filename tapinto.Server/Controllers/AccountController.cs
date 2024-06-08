using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ILogger<AccountController> _logger;
        private readonly AppDbContext context;

        public AccountController(ILogger<AccountController> logger, AppDbContext _context)
        {
            _logger = logger;
            context = _context;
        }

        [HttpPost("login")]
        public ActionResult<UserDto> Login(LoginDto loginDto){
            var user = context.Users.Include(gb => gb.groupUserBridge)
                    .ThenInclude(g => g.Group).Where(u => u.Email == loginDto.Email).FirstOrDefault();
            if(user != null && user.Password == loginDto.Password){
                return new UserDto(user);
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