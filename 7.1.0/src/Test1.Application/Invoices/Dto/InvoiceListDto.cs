using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace Test1.Invoices.Dto
{
    public class InvoiceListDto : Entity<int>, IHasCreationTime
    {
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Customer { get; set; }
        public int TermDays { get; set; }
        public double Total { get; set; }
        public DateTime CreationTime { get; set; }
    }
}