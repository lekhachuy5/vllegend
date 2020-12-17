using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VL_Legend.Models
{
    public class FileUploadViewModel
    {
        public IFormFile file { get; set; }
        
    }
}
