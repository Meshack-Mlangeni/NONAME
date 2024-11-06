using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Models;

namespace tapinto.Server.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<School> Schools { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Activity> Activity { get; set; }
        public DbSet<Membership> Membership { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<PossibleAnswer> PossibleAnswers { get; set; }
        public DbSet<ChatHistory> ChatHistory { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<TeacherRequests> Requests { get; set; }
        public DbSet<ActivityImage> ActivityImages { get; set; }
        public DbSet<Contributions> Contributions { get; set; }
    }
}