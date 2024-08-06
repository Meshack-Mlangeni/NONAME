using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

namespace tapinto.Server.Controllers
{
    public class SchoolController : BaseApiController
    {
        private readonly AppDbContext context;

        public SchoolController(AppDbContext _appDbContext)
        {
            context = _appDbContext;
        }

        [AllowAnonymous]
        [HttpGet("getallschools")]
        public ActionResult<SchoolDto> GetAllSchools()
        {
            var schools = context.Schools.Include(g => g.Groups).ToList();
            return Ok(schools.Select(s => new SchoolDto(s)
            {
                Groups = s.Groups.Select(g => new GroupDto(g)).ToArray(),
            }));
        }
    }
}