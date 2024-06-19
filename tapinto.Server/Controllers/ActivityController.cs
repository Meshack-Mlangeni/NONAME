using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Controllers
{
    public class ActivityController : BaseApiController
    {
        [HttpPut("create")]
        public ActionResult<PostDto> Create(PostDto post)
        {
            return Ok(post);
        }
    }
}
