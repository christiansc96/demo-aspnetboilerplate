using System.ComponentModel.DataAnnotations;

namespace Test1.Invoices.Dto
{
    public class CreateInvoiceDetailInput
    {
        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public int QTY { get; set; }


        [Range(1, double.MaxValue, ErrorMessage = "The value is out of range")]
        public double Price { get; set; }


        [Range(1, double.MaxValue, ErrorMessage = "The value is out of range")]
        public double TotalLine { get; set; }
    }
}