using Abp.MultiTenancy;
using System.ComponentModel.DataAnnotations;

namespace Test1.Authorization.Accounts.Dto
{
    /// <summary>
    /// 
    /// </summary>
    public class IsTenantAvailableInput
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        public string TenancyName { get; set; }
    }
}