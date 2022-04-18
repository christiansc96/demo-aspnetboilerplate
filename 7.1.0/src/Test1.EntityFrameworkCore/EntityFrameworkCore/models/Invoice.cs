using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Test1.EntityFrameworkCore.models
{
    public class Invoice : Entity<int>, IHasCreationTime
    {
        [StringLength(100)]
        [Required]
        public virtual string InvoiceNumber { get; set; }

        public virtual DateTime InvoiceDate { get; set; }

        [StringLength(400)]
        [Required]
        public virtual string Customer { get; set; }

        public virtual int TermDays { get; set; }

        public virtual double Total { get; set; }        
        
        public virtual DateTime CreationTime { get; set; }

        public Invoice()
        {
            CreationTime = DateTime.Now;
            InvoiceDate = DateTime.Now;
        }
    }
}