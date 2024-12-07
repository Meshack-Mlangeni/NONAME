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
        public DbSet<PollActivity> PollActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Activity>().Navigation(a => a.Answers).AutoInclude();
            builder.Entity<Activity>().Navigation(a => a.Group).AutoInclude();
            builder.Entity<Activity>().Navigation(a => a.Likes).AutoInclude();
            builder.Entity<Activity>().Navigation(a => a.Answers).AutoInclude();

            builder.Entity<Comments>().Navigation(a => a.Activity).AutoInclude();
            builder.Entity<Like>().Navigation(a => a.Activity).AutoInclude();

            builder.Entity<Group>().Navigation(a => a.groupUserBridge).AutoInclude();
            builder.Entity<Group>().Navigation(a => a.School).AutoInclude();

            builder.Entity<Membership>().Navigation(a => a.Group).AutoInclude();
            builder.Entity<ChatHistory>().Navigation(a => a.Activity).AutoInclude();

            base.OnModelCreating(builder);
        }
    }
}