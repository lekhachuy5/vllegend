using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.Models;

namespace VL_Legend.DAL.RepositoryCall
{
    public class CoursesRepository : GenericRepository<Courses,VLLsqlContext>
    {
        public CoursesRepository(VLLsqlContext context):base(context)
        {

        }

    }
}
