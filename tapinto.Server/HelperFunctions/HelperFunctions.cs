using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.Models;

namespace tapinto.Server.HelperFunctions
{
    public class HelperFunctions
    {
        public async Task<string> GetFullNames(string email, UserManager<User> userManager)
        {
            var user = await userManager.FindByEmailAsync(email);
            return $"{user.FirstName} {user.LastName}";
        }
        public async Task<bool> GetVerification(string email, UserManager<User> userManager) =>
            (await userManager.FindByEmailAsync(email))?.Verified ?? false;
    }
}