using Microsoft.AspNetCore.Mvc;

namespace tapinto.Server.Interfaces
{
    public interface IImageService
    {
        IActionResult CreateImage(IFormFile file);
    }
}