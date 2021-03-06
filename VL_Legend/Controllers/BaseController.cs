﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VL_Legend.DAL;

namespace VL_Legend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController<TEntity, TRepository> : ControllerBase where TEntity : class, IEntity
        where TRepository : IGenericRepository<TEntity>
    {
        private readonly TRepository _repository;
        public BaseController(TRepository repository)
        {
            _repository = repository;
        }

        //get :api/[controller]
        [HttpGet]
        public async Task<ActionResult<List<TEntity>>> Get()
        {
            return await _repository.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(long Id)
        {
            var data = await _repository.GetOne(Id);
            if (data == null)
            {
                return NotFound();
            }
            return data;
        }
        [Route("Edit/{id}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put( TEntity data)
        {
            
           
            await _repository.Update(data);
            return NoContent();
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity data)
        {
            await _repository.Add(data);
            return CreatedAtAction("Get", new { id = data.Id }, data);
        }
        [Route("Delete/{id}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(long id)
        {
            var data = await _repository.Delete(id);
            if(data == null)
            {
                return NotFound();
            }
            return data;
        }

       
    }
}
