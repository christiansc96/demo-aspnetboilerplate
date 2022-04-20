using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.EntityFrameworkCore.models;
using Test1.Invoices.Dto;

namespace Test1.Invoices
{
    /// <summary>
    /// This repository is the administrator of the INVOICE entity.
    /// </summary>
    public class InvoiceAppService : Test1AppServiceBase, IInvoiceAppService
    {
        private readonly IRepository<Invoice> _invoiceRepository;
        private readonly IRepository<InvoiceDetail> _invoiceDetailRepository;

        /// <summary>
        /// This is the constructor of the repository.
        /// </summary>
        /// <param name="invoiceRepository"></param>
        /// <param name="invoiceDetailRepository"></param>
        public InvoiceAppService(IRepository<Invoice> invoiceRepository,
                                 IRepository<InvoiceDetail> invoiceDetailRepository)
        {
            _invoiceRepository = invoiceRepository;
            _invoiceDetailRepository = invoiceDetailRepository;
        }

        /// <summary>
        /// Request to create a new invoice.
        /// </summary>
        /// <param name="input"></param>
        public async Task CreateInvoice(CreateInvoiceInput input)
        {
            if (input.Details.Count > 0)
            {
                try
                {
                    double total = input.Details.Sum(detail => detail.qty * detail.price);
                    int newInvoice =  _invoiceRepository.InsertAndGetIdAsync(new Invoice
                    {
                        InvoiceNumber = input.InvoiceNumber,
                        InvoiceDate = input.InvoiceDate,
                        Customer = input.Customer,
                        TermDays = input.TermDays,
                        Total = total
                    }).Result;

                    foreach (var detail in input.Details)
                    {
                        await _invoiceDetailRepository.InsertAsync(new InvoiceDetail
                        {
                            InvoiceId = newInvoice,
                            QTY = detail.qty,
                            Price = detail.price,
                            TotalLine = detail.qty * detail.price
                        });
                    }
                }
                catch
                {
                    throw;
                }
            }
        }

        /// <summary>
        /// Request to delete an invoice.
        /// </summary>
        /// <param name="input"></param>
        public async Task DeleteInvoice(EntityDto<int> input)
        {
            Invoice invoiceFromDatabase = await _invoiceRepository.GetAsync(input.Id);
            if (invoiceFromDatabase != null)
            {
                try
                {
                    List<InvoiceDetail> invoiceDetailsFromDatabase = await _invoiceDetailRepository
                        .GetAllListAsync(detail => detail.InvoiceId == input.Id);

                    foreach (var detail in invoiceDetailsFromDatabase)
                    {
                        await _invoiceDetailRepository.DeleteAsync(detail);
                    }
                    await _invoiceRepository.DeleteAsync(invoiceFromDatabase);
                }
                catch
                {
                    throw;
                }
            }
        }

        /// <summary>
        /// Request to get invoice by id.
        /// </summary>
        /// <returns></returns>
        public async Task<InvoiceDto> GetInvoice(EntityDto<int> input)
        {
            Invoice invoiceFromDatabase = await _invoiceRepository.GetAsync(input.Id);
            if (invoiceFromDatabase == null)
                return null;

            var invoiceDetailsFromDatabase = await _invoiceDetailRepository.GetAllListAsync(detail => detail.InvoiceId == input.Id);
            return new InvoiceDto
            {
                Id = invoiceFromDatabase.Id,
                InvoiceNumber = invoiceFromDatabase.InvoiceNumber,
                InvoiceDate = invoiceFromDatabase.InvoiceDate,
                Customer = invoiceFromDatabase.Customer,
                TermDays = invoiceFromDatabase.TermDays,
                Total = invoiceFromDatabase.Total,
                Details = invoiceDetailsFromDatabase.Select(invoice => new InvoiceDetailListDto()
                {
                    Id = invoice.Id,
                    InvoiceId = invoice.InvoiceId,
                    QTY = invoice.QTY,
                    Price = invoice.Price,
                    TotalLine = invoice.TotalLine,
                    CreationTime = invoice.CreationTime
                }).ToList()
            }; 
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
        public async Task UpdateInvoice(UpdateInvoiceInput input)
        {
            Invoice invoiceFromDatabase = await _invoiceRepository.GetAsync(input.Id);
            if (invoiceFromDatabase != null)
            {
                invoiceFromDatabase.InvoiceNumber = input.InvoiceNumber;
                invoiceFromDatabase.InvoiceDate = input.InvoiceDate;
                invoiceFromDatabase.Customer = input.Customer;
                invoiceFromDatabase.TermDays = input.TermDays;
                await _invoiceRepository.UpdateAsync(invoiceFromDatabase);
            }
        }
    }
}