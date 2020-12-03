using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.Models;

namespace VL_Legend.DAL.RepositoryCall
{
    public class ClassRoomRepository : GenericRepository<Classroom,VLLsqlContext>
    {
        public ClassRoomRepository(VLLsqlContext context):base(context)
        {

        }
    }
}
