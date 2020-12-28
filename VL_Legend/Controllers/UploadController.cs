using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VL_Legend.Models;

namespace VL_Legend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public UploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [Route("Postfile/{folder}")]
        [HttpPost("folder")]    
        public async Task<IActionResult> Upload(IFormFile file,string folder)
        {
            
            var files = file;
            if (String.IsNullOrEmpty(folder))
            {
                folder = "Upload";
            }
            if (file.Length > 0)
            {
               
                string pathup = Path.Combine(_env.ContentRootPath, @"ClientApp\public\Storages\"+folder);
                string path = Path.Combine(_env.ContentRootPath, @"ClientApp\public\Storages\" + folder+@"\" + files.FileName );
                bool exist = System.IO.Directory.Exists(pathup);
                if (!exist)
                {
                    System.IO.Directory.CreateDirectory(pathup);
                }
                using (var fs = new FileStream(path, FileMode.Create))
                {
             
                    await file.CopyToAsync(fs);
                }
                return Ok();
                
            }
            return BadRequest();
        }
    }
}
