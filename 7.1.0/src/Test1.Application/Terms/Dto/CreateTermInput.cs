using System.ComponentModel.DataAnnotations;

namespace Test1.Terms.Dto
{
    public class CreateTermInput
    {
        [Required(ErrorMessage = "This field is required")]
        [StringLength(400, ErrorMessage = "Only 400 characters are accepted")]
        public string Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public int Days { get; set; }
    }
}