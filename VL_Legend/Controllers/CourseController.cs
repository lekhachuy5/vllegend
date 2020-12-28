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
    public class CourseController : BaseController<Courses,CoursesRepository>
    {
        private readonly CoursesRepository _repository;
        public CourseController(CoursesRepository repository) : base(repository)
        {
            _repository = repository;
        }
        [Route("GetAllById/{id}")]
        [HttpGet()]
        public async Task<ActionResult<List<Courses>>> GetListById(long id)
        {
            return await _repository.GetAll(x=>x.Class_Id == id);
        }
    }
}
