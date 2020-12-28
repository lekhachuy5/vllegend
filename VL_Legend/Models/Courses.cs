using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using VL_Legend.DAL;

namespace VL_Legend.Models
{
    public class Courses : IEntity
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Không được bỏ trống")]
        [StringLength(250, MinimumLength = 10, ErrorMessage = "ít nhất 10 ký tự tối đa 250 ký tự")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Không được bỏ trống")]
        public string Descriptions { get; set; }
        public string EnrollKey { get; set; }
        [ForeignKey("Classroom")]
        public long Class_Id { get; set; }
        public virtual Classroom Classroom { get; set; }
    }
}
