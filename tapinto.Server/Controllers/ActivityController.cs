using Microsoft.AspNetCore.Mvc;
using tapinto.Server.Data;
using tapinto.Server.DataTransferObjects;
using tapinto.Server.Models;

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
        public async Task<ActionResult<PostDto>> CreateAsync(PostDto post)
        {
            try
            {
                var newPost = new Post(post);
                await context.Posts.AddAsync(newPost);
                if ((await context.SaveChangesAsync()) > 0)
                {
                    return Ok(post);
                }
                return BadRequest(post);
            }
            catch (Exception e)
            {
                return BadRequest(post);
            }
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
