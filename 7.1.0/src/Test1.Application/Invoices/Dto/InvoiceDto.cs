using Abp.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Test1.Invoices.Dto
{
    public class InvoiceDto : Entity<int>
    {
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Customer { get; set; }
        public int TermDays { get; set; }
        public double Total { get; set; }
        public List<InvoiceDetailListDto> Details { get; set; }

        public InvoiceDto()
        {
            Details = new List<InvoiceDetailListDto>();
        }
    }
}