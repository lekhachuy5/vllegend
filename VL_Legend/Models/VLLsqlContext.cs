using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VL_Legend.Models
{
    public class VLLsqlContext: DbContext
    {
        public VLLsqlContext(DbContextOptions<VLLsqlContext> options) : base(options)
        {

        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<Classroom> Classroom { get; set; }
        public DbSet<System_Config> System_Config { get; set; }
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }

    }
}
