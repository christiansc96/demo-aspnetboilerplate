using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;

namespace Test1.Terms.Dto
{
    public class TermDto : EntityDto<int>, IHasCreationTime
    {
        public string Name { get; set; }

        public int Days { get; set; }

        public DateTime CreationTime { get; set; }
    }
}