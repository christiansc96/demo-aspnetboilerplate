using System.ComponentModel.DataAnnotations;

namespace Test1.Invoices.Dto
{
    public class CreateInvoiceDetailInput
    {
        [Required(ErrorMessage = "This field is required")]
        [StringLength(400, ErrorMessage = "Only 400 characters are accepted")]
        public string Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public int qty { get; set; }

        [Range(1, double.MaxValue, ErrorMessage = "The value is out of range")]
        public double price { get; set; }

        [Range(1, double.MaxValue, ErrorMessage = "The value is out of range")]
        public double totalLine { get; set; }
    }
}