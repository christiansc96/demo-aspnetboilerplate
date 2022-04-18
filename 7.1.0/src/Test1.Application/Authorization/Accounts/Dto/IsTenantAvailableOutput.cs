namespace Test1.Authorization.Accounts.Dto
{
    /// <summary>
    /// 
    /// </summary>
    public class IsTenantAvailableOutput
    {
        public TenantAvailabilityState State { get; set; }

        public int? TenantId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IsTenantAvailableOutput()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="state"></param>
        /// <param name="tenantId"></param>
        public IsTenantAvailableOutput(TenantAvailabilityState state, int? tenantId = null)
        {
            State = state;
            TenantId = tenantId;
        }
    }
}