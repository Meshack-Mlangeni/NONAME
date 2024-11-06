using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Helpers
{
    public static class MindMetaExtentions
    {
        public static async Task<string> EmailAsync(this System.Security.Principal.IIdentity? identity, UserManager<User> userManager)
        {
            var userName = identity.Name;
            if (!string.IsNullOrEmpty(userName))
            {
                var userEmail = (await userManager.FindByNameAsync(userName)).Email;
                return userEmail;
            }
            return null;
        }
    }
}