using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Helpers
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

        public static bool activityHasImageFile(ActivityDto activity) => activity.File != null && activity.File.Length > 0;
        public static bool imageUploadSuccessful(ImageUploadResult imageUploadResults) => imageUploadResults != null && imageUploadResults.Error is null;
    }
}