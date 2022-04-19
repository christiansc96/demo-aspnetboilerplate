using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace Test1.Invoices.Dto
{
    public class InvoiceDetailListDto : Entity<int>, IHasCreationTime
    {
        public int InvoiceId { get; set; }
        public int QTY { get; set; }
        public double Price { get; set; }
        public  double TotalLine { get; set; }
        public  DateTime CreationTime { get; set; }
    }
}