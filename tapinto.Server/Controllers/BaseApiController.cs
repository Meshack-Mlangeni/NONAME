using CloudinaryDotNet;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using tapinto.Server.Data;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController<T> : ControllerBase where T : class
    {
        protected readonly AppDbContext dbContext;
        protected readonly ILogger<T> logger;
        protected readonly UserManager<User> userManager;
        public BaseApiController(AppDbContext _dbContext, ILogger<T> _logger, UserManager<User> _userManager)
        {
            dbContext = _dbContext;
            logger = _logger;
            userManager = _userManager;
        }
    }
}