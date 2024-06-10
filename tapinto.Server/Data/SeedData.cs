using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Models;

namespace tapinto.Server.Data
{
    public static class SeedData
    {
        private static readonly string[] roles = ["Admin", "Student", "Teacher"];
        private static readonly string password = "@Meshack123";
        private static readonly User[] preAddedUsers = [
            new User{
                FirstName = "Mncedisi",
                LastName = "Mlangeni",
                Verified = true,
                SchoolId = 1,
                Email = "meshackmlangeni@hotmail.com",
                UserName = "Admin"
            },
              new User{
                FirstName = "Njabulo",
                LastName = "Mlangeni",
                Verified = true,
                SchoolId = 1,
                Email = "njabulo261@gmail.com",
                UserName = "User"
            }
        ];
        public static async Task EnsurePopulated(IApplicationBuilder app)
        {
            AppDbContext context = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();
            UserManager<User> userManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<UserManager<User>>();
            RoleManager<IdentityRole> roleManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            if (context.Database.GetMigrations().Any())
                context.Database.Migrate();

            foreach (var role in roles)
            {
                if ((await roleManager.FindByNameAsync(role)) == null)
                    await roleManager.CreateAsync(new(role));
            }
            context.SaveChanges();

            if (!context.Schools.Any())
            {
                context.Schools.AddRange([
                   new(){ SchoolName = "Mzimela High School", UserEmail= "meshackmlangeni@outlook.com"},
                ]);
            }
            context.SaveChanges();

            if (!context.Groups.Any())
            {
                context.Groups.AddRange([
                   new(){ GroupName = "Grade 12z", SchoolId = 1 , UserEmail="meshackmlangeni@outlook.com"},
                    new(){ GroupName = "Merien", SchoolId = 1 , UserEmail="njabulo261@gmail.com"},
                ]);
            }
            context.SaveChanges();

            if (!context.GroupUsers.Any())
            {
                context.GroupUsers.AddRange([
                   new(){ UserEmail = "meshackmlangeni@outlook.com", GroupId = 1 },
                   new(){ UserEmail = "njabulo261@gmail.com", GroupId = 1 },
                   new(){ UserEmail = "meshackmlangeni@outlook.com", GroupId = 2 },
                ]);
            }
            context.SaveChanges();

            if (!userManager.Users.Any())
                foreach (var user in preAddedUsers)
                    if ((await userManager.FindByEmailAsync(user.Email)) == null)
                        if ((await userManager.CreateAsync(user, password)).Succeeded)
                            await userManager.AddToRolesAsync(user, user.Email.Contains("njabulo") ? ["Teacher"] : ["Admin", "Student"]);
            context.SaveChanges();
        }
    }
}