using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.DAL;

namespace VL_Legend.Models
{
    public class Classroom: IEntity
    {
        public long Id { get; set; }
        [Required(ErrorMessage ="Không được bỏ trống")]
        [StringLength(250,MinimumLength = 10, ErrorMessage = "ít nhất 10 ký tự tối đa 250 ký tự")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Không được bỏ trống")]
        public string Descriptions { get; set; }
        public virtual List<Courses> Courses { get; set; }
    }
}
