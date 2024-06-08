using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Models;

namespace tapinto.Server.Data
{
    public static class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            AppDbContext context = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();
            if (context.Database.GetMigrations().Any())
                context.Database.Migrate();

            if (!context.Users.Any())
            {
                 context.Users.AddRange([
                    new(){
                        FirstName = "Mncedisi",
                        LastName = "Mlangeni",
                        Password = "mncedisi123",
                        Email="mnce@test.com"
                    },
                    new(){
                        FirstName = "Njabulo",
                        LastName = "Magasela",
                        Password = "mncedisi123",
                        Email="Nje@test.com"
                    },
                ]);
            }
            context.SaveChanges();
            if (!context.Schools.Any())
            {
                 context.Schools.AddRange([
                    new(){ SchoolName = "Mzimela High School", userEmail= "mnce@test.com"},
                ]);
            }
            context.SaveChanges();
            if (!context.Groups.Any())
            {
                 context.Groups.AddRange([
                    new(){ GroupName = "Grade 12z", SchoolId = 1 , userEmail="mnce@test.com"},
                    new(){ GroupName = "Merien", SchoolId = 1 , userEmail="nje@test.com"},
                ]);
            }
            context.SaveChanges();
            if (!context.GroupUsers.Any())
            {
                context.GroupUsers.AddRange([
                   new(){ UserId = 1, GroupId = 1 },
                   new(){ UserId = 2, GroupId = 1 },
                   new(){ UserId = 1, GroupId = 2 },
                ]);
            }

            context.SaveChanges();
        }
    }
}