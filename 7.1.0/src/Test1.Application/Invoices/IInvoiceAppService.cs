using System.Threading.Tasks;
using Test1.Invoices.Dto;

namespace Test1.Invoices
{
    /// <summary>
    /// This repository is the administrator of the INVOICE entity.
    /// </summary>
    public interface IInvoiceAppService
    {
        /// <summary>
        /// Request to create a new invoice.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateInvoice(CreateInvoiceInput input);
    }
}