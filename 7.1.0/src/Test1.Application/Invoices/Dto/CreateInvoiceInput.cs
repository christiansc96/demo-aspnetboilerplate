using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Test1.Invoices.Dto
{
    public class CreateInvoiceInput
    {
        [Required(ErrorMessage = "This field is required")]
        [StringLength(100, ErrorMessage = "Only 100 characters are accepted")]
        public string InvoiceNumber { get; set; }

        public DateTime InvoiceDate { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [StringLength(400, ErrorMessage = "Only 400 characters are accepted")]
        public string Customer { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public int TermDays { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public double Total { get; set; }

        public List<CreateInvoiceDetailInput> Details { get; set; }

        public CreateInvoiceInput()
        {
            Details = new List<CreateInvoiceDetailInput>();
        }
    }
}