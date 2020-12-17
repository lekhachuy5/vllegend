using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.Models;

namespace VL_Legend.DAL.RepositoryCall
{
    public class System_ConfigRepository : GenericRepository<System_Config,VLLsqlContext>
    {
        public System_ConfigRepository(VLLsqlContext context):base(context)
        {

        }
    }
}
