using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VL_Legend.DAL.RepositoryCall;
using VL_Legend.Models;

namespace VL_Legend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : BaseController<Classroom,ClassRoomRepository>
    {
        public ClassroomController(ClassRoomRepository repository) : base(repository)
        {

        }
        
    }
}
