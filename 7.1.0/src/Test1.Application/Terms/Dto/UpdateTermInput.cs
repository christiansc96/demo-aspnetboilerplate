using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Test1.Terms.Dto
{
    public class UpdateTermInput : EntityDto<int>, IHasCreationTime
    {
        [Required(ErrorMessage = "This field is required")]
        [StringLength(400, ErrorMessage = "Only 400 characters are accepted")]
        public string Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The value is out of range")]
        public int Days { get; set; }

        public DateTime CreationTime { get; set; }

        public UpdateTermInput()
        {
            CreationTime = DateTime.Now;
        }
    }
}