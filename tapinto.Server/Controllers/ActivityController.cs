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
            post.TimeStamp = DateTime.Now;
            post.Upvotes = 0;
            return Ok(post);
        }

        [HttpPut("getallactivity/{userId}")]
        public ActionResult<PostDto> getAllActivity(int userId)
        {
            //var activityForUser = context.Posts.Where(p => p.go)
            return Ok();
        }


        [HttpGet("getlabels")]
        public ActionResult GetLabels()
        {
            var labels = context.Labels.ToList();
            return Ok(labels);
        }

    }
}
