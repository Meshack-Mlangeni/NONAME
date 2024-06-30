using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
       
        public AuthController(IConfiguration configuration , UserManager<User> userManager)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
      
        [HttpPost]

        public async Task<Token> Auntheticate(User user )
        {
            //verify credential
            if (user != null)
            {
                //create security context
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.Name,user.UserName)
                };

                var roles = await _userManager.GetRolesAsync(user);

                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var expiresAt = DateTime.UtcNow.AddMinutes(15);


                return new Token
                {
                    accessToken = CreateToken(claims, expiresAt),
                    expiresAt = expiresAt,
                };
                
            }

            ModelState.AddModelError("Unauthorized", "Missing credentials");
            return null;
               
        }

        private string CreateToken(IEnumerable<Claim> claims, DateTime expiresAt)
        {
            var secretKey = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("secretKey")?? "");

            var jwt = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expiresAt,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256Signature));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
