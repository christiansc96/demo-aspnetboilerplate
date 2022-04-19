using Abp.Domain.Entities;
using System;

namespace Test1.Invoices.Dto
{
    public class InvoiceDto : Entity<int>
    {
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Customer { get; set; }
        public int TermDays { get; set; }
        public double Total { get; set; }
    }
}