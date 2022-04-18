using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.EntityFrameworkCore.models;
using Test1.Invoices.Dto;

namespace Test1.Invoices
{
    public class InvoiceAppService : Test1AppServiceBase, IInvoiceAppService
    {
        private readonly IRepository<Invoice> _invoiceRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="nvoiceRepository"></param>
        public InvoiceAppService(IRepository<Invoice> nvoiceRepository)
        {
            _invoiceRepository = nvoiceRepository;
        }

        /// <summary>
        /// Request to create a new invoice.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateInvoice(CreateInvoiceInput input)
        {
            await _invoiceRepository.InsertAsync(new Invoice 
            { 
                InvoiceNumber = input.InvoiceNumber, 
                InvoiceDate = input.InvoiceDate,
                Customer = input.Customer,
                TermDays = input.TermDays,
                Total = input.Total
            });
        }

        /// <summary>
        /// Request to delete an invoice.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task DeleteInvoice(EntityDto<int> input)
        {
            Invoice invoiceFromDatabase = await _invoiceRepository.GetAsync(input.Id);
            if (invoiceFromDatabase != null)
                await _invoiceRepository.DeleteAsync(invoiceFromDatabase);
        }

        /// <summary>
        /// Request to get invoices.
        /// </summary>
        /// <returns></returns>
        public async Task<List<InvoiceListDto>> GetInvoices()
        {
            List<Invoice> invoicesFromDatabase = await _invoiceRepository.GetAllListAsync();
            return invoicesFromDatabase.Select(invoice => new InvoiceListDto()
            {
                Id = invoice.Id,
                InvoiceNumber = invoice.InvoiceNumber,
                InvoiceDate = invoice.InvoiceDate,
                Customer = invoice.Customer,
                TermDays = invoice.TermDays,
                Total = invoice.Total,
                CreationTime = invoice.CreationTime
            }).ToList();
        }

        /// <summary>
        /// Request to update a term.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task UpdateInvoice(UpdateInvoiceInput input)
        {
            Invoice invoiceFromDatabase = await _invoiceRepository.GetAsync(input.Id);
            if (invoiceFromDatabase != null)
            {
                invoiceFromDatabase.InvoiceNumber = input.InvoiceNumber;
                invoiceFromDatabase.InvoiceDate = input.InvoiceDate;
                invoiceFromDatabase.Customer = input.Customer;
                invoiceFromDatabase.TermDays = input.TermDays;
                invoiceFromDatabase.Total = input.Total;
                await _invoiceRepository.UpdateAsync(invoiceFromDatabase);
            }
        }
    }
}