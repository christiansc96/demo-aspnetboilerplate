using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Test1.EntityFrameworkCore.models
{
    public class Term : Entity<int>, IHasCreationTime, IHasModificationTime
    {
        [StringLength(400)]
        [Required]
        public virtual string Name { get; set; }
        public virtual int Days { get; set; }
        public virtual DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

        public Term()
        {
            CreationTime = DateTime.Now;
        }
    }
}