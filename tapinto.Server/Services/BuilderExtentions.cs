using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using tapinto.Server.Controllers;
using tapinto.Server.Data;
using tapinto.Server.Models;

namespace tapinto.Server.Services
{
    public static class BuilderExtentions
    {
        public static IServiceCollection AddDatabaseConnection(this IServiceCollection services, WebApplicationBuilder builder, string connString)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString(connString));
            });
            return services;
        }

        public static IServiceCollection ConfigureApplicationCORS(this IServiceCollection services, out string app_cors_name)
        {
            const string CORS = "APPCORS";
            services.AddCors(options =>
            {
                options.AddPolicy(name: CORS, builder =>
                {
                    builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("https://localhost:5000")
                    .WithOrigins("https://localhost:5000/livehub")
                    .AllowCredentials();
                });
            });
            app_cors_name = CORS;
            return services;
        }

        public static IServiceCollection ConfigureIdentityCore<T>(this IServiceCollection services) where T : class
        {
            services.AddIdentityCore<T>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireDigit = true;
            })
            .AddRoles<IdentityRole>()
            .AddSignInManager()
            .AddEntityFrameworkStores<AppDbContext>();
            return services;
        }

        public static IServiceCollection ConfigureAuthenticationAndAthorization(this IServiceCollection services, WebApplicationBuilder builder, string secretKey)
        {
            var Key = builder.Configuration.GetValue<string>(secretKey);
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme
                ).AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key ?? string.Empty)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true
                    };
                });
            builder.Services.AddAuthorization();
            return services;
        }

        public static IServiceCollection ConfigureSwaggerAndEndPoints(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(s =>
            {
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Description = "Put Bearer + your token in the box below",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                s.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
                s.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        jwtSecurityScheme, Array.Empty<string>()
                    }
                });
            });
            return services;
        }

        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            //services.AddFeatureManagement();
            services.AddSignalRCore();
            services.AddSignalR();
            services.AddControllers();
            services.AddScoped<AuthController>();
            return services;
        }
    }
}