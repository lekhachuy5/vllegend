using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace VL_Legend.DAL
{
    public interface IGenericRepository<T> where T : class, IEntity
    {
        Task<List<T>> GetAll(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");
        Task<T> GetOne(long Id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(long Id);
    }
}
