using Microsoft.AspNetCore.Mvc;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly AppDbContext context;

        public ActivityController(AppDbContext _context)
        {
            context = _context;
        }

        [HttpPut("create")]
        public ActionResult<PostDto> Create(PostDto post)
        {
            return Ok(post);
        }


        [HttpGet("getlabels")]
        public ActionResult GetLabels()
        {
            var labels = context.Labels.ToList();
            return Ok(labels);
        }

    }
}
