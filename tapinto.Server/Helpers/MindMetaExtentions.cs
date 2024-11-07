using System.Globalization;
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

        public static ILogger<T> LogInfoWithDefault<T>(this ILogger<T> logger, string log)
        {
            logger.LogInformation(log);
            return logger;
        }

        public static string ToTitleCase(this string value)
        {
            return value == "" ? "" : CultureInfo.CurrentCulture.TextInfo.ToTitleCase(value); ;
        }
    }
}