using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test1.EntityFrameworkCore.models
{
    public class InvoiceDetail : Entity<int>, IHasCreationTime, IHasModificationTime
    {
        public virtual int InvoiceId { get; set; }
        [ForeignKey("Id")]
        public virtual Invoice Invoices { get; set; }

        public virtual int QTY { get; set; }
        public virtual double Price { get; set; }
        public virtual double TotalLine { get; set; }
        public virtual DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

        public InvoiceDetail()
        {
            CreationTime = DateTime.Now;
        }
    }
}