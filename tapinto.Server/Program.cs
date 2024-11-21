using tapinto.Server.Data;
using tapinto.Server.Helpers;
using tapinto.Server.Middleware;
using tapinto.Server.Models;
using tapinto.Server.Services;

namespace tapinto.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            string CORS = string.Empty;
            var builder = WebApplication.CreateBuilder(args);
            //builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging")).AddConsole();
            builder.Services
                .AddScopedServices()
                .Configure<CloudinaryConfig>(builder.Configuration.GetSection("CloudinaryConfig"))
                .ConfigureSwaggerAndEndPoints()
                .AddDatabaseConnection(builder: builder, connString: "AppConnection")
                .ConfigureApplicationCORS(out CORS)
                .ConfigureIdentityCore<User>()
                .ConfigureAuthenticationAndAthorization(builder: builder, secretKey: "secretKey")
                .AddResponseCaching(options =>
                {
                    options.MaximumBodySize = 1024;
                    options.UseCaseSensitivePaths = true;
                });

            var app = builder.Build();

            app.UseDefaultFiles();
            //app.UseStaticFiles();
            app.UseCors(CORS);
            app.UseResponseCaching();
            app.Use(async (context, next) =>
            {
                context.Response.GetTypedHeaders().CacheControl =
                  new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
                  {
                      Public = true,
                      MaxAge = TimeSpan.FromSeconds(40)
                  };
                context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] = new string[] { "Accept-Encoding" };
                await next();
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
                });
            }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.MapFallbackToFile("/index.html");
            await SeedData.EnsurePopulated(app);
            app.MapHub<LiveHub>("/live");
            app.Run();
        }
    }
}