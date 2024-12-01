using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Identity;
using tapinto.Server.Data;
using System.IO;
using tapinto.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using tapinto.Server.Helpers;

namespace tapinto.Server.Controllers
{
    public class AdminController : BaseApiController<AdminController>
    {
        public AdminController(AppDbContext _dbContext, ILogger<AdminController> _logger, UserManager<User> _userManager) : base(_dbContext, _logger, _userManager)
        {
        }

        [Authorize]
        [HttpPost("uploadschoolssheet")]
        public async Task<IActionResult> UploadSchoolSheet(IFormFile file)
        {
            var response = new DataResponse<List<School>>();
            var admin = await userManager.FindByNameAsync(User.Identity.Name);
            if (admin == null)
            {
                response.ResponseFailedWithMessage("Error Updating Schools.");
                return Ok(response);
            }
            var allSchools = new List<School>();
            int count = 0;
            using (var stream = file.OpenReadStream())
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    do
                    {
                        while (reader.Read())
                        {
                            count++;
                            if (count == 1) continue;
                            try
                            {
                                if (!reader.GetString(9).ToLower().Contains("primary"))
                                    allSchools.Add(new()
                                    {
                                        SchoolName = reader.GetString(4).ConvertTextToTitleCase(),
                                        Province = (reader.GetString(2) ?? "NO PROVINCE PROVIDED").ConvertTextToTitleCase(),
                                        UserEmail = admin.Email,
                                        District = (reader.GetString(10) ?? "NO DISTRICT PROVIDED").ConvertTextToTitleCase(),
                                        MunicipalityName = (reader.GetString(22) ?? "NO MUNICIPALITY PROVIDED").ConvertTextToTitleCase(),
                                        StreetAddress = (reader.GetString(30) ?? "NO ADDRESS PROVIDED").ConvertTextToTitleCase(),
                                        PostalAddress = (reader.GetString(31) ?? "NO ADDRESS PROVIDED").ConvertTextToTitleCase(),
                                        Telephone = (reader.GetString(32) ?? "NO NUMBER PROVIDED").ConvertTextToTitleCase(),
                                    });
                            }
                            catch { continue; }
                        }
                    } while (reader.NextResult());
                }
            }
            var schoolsInDb = dbContext.Schools.Select(school => school.SchoolName).ToList();
            foreach (var school in allSchools)
            {
                if (schoolsInDb.Any(s => s.ToLower() == school.SchoolName.ToLower())) continue;
                dbContext.Schools.Add(school);
            }

            int res = -1;
            string errorMessage = "";
            try
            {
                res = await dbContext.SaveChangesAsync();
            }
            catch (Exception e) { errorMessage = e.Message; }
            if (res > 0)
            {
                response.ResponseSuccessWithMessage("Schools Successfully Added To Database", data: allSchools);
            }
            else
            {
                response.ResponseFailedWithMessage($"Could Not Add Schools To Database, See Error: {errorMessage}");
            }
            return Ok(response);
        }
    }
}