using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.DAL;

namespace VL_Legend.Models
{
    public class System_Config : IEntity
    {
        public long Id { get; set; }
        public string Keywords { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Facebook { get; set; }
        public string Slogan { get; set; }
        public string Image { get; set; }
    }
}
