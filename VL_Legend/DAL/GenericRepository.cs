using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VL_Legend.DAL
{
    public abstract class GenericRepository<TEntity, TContext> : IGenericRepository<TEntity> where TEntity : class, IEntity where TContext : DbContext
    {
        private readonly TContext _context;
        public GenericRepository(TContext context)
        {
            this._context = context;
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<TEntity> Delete(long Id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(Id);
            if (entity == null)
            {
                return entity;
            }
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> GetOne(long id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
