using System.Threading.Tasks;
using Test1.Invoices.Dto;

namespace Test1.Invoices
{
    public interface IInvoiceAppService
    {
        Task CreateInvoice(CreateInvoiceInput input);
    }
}