using Abp.Web.Security.AntiForgery;
using Microsoft.AspNetCore.Antiforgery;
using Test1.Controllers;

namespace Test1.Web.Host.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class AntiForgeryController : Test1ControllerBase
    {
        private readonly IAntiforgery _antiforgery;
        private readonly IAbpAntiForgeryManager _antiForgeryManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="antiforgery"></param>
        /// <param name="antiForgeryManager"></param>
        public AntiForgeryController(IAntiforgery antiforgery, IAbpAntiForgeryManager antiForgeryManager)
        {
            _antiforgery = antiforgery;
            _antiForgeryManager = antiForgeryManager;
        }

        /// <summary>
        /// 
        /// </summary>
        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }

        /// <summary>
        /// 
        /// </summary>
        public void SetCookie()
        {
            _antiForgeryManager.SetCookie(HttpContext);
        }
    }
}