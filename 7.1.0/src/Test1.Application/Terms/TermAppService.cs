using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.EntityFrameworkCore.models;
using Test1.Terms.Dto;

namespace Test1.Terms
{
    public class TermAppService : Test1AppServiceBase, ITermAppService
    {
        private readonly IRepository<Term> _termRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="termRepository"></param>
        public TermAppService(IRepository<Term> termRepository)
        {
            _termRepository = termRepository;
        }

        /// <summary>
        /// Request to create a new term.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateTerm(CreateTermInput input)
        {
            await _termRepository.InsertAsync(new Term { Name = input.Name, Days = input.Days });
        }

        /// <summary>
        /// Request to delete a term.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task DeleteTerm(EntityDto<int> input)
        {
            Term termFromDatabase = await _termRepository.GetAsync(input.Id);
            await _termRepository.DeleteAsync(termFromDatabase);
        }

        /// <summary>
        /// Request to create terms.
        /// </summary>
        /// <returns></returns>
        public async Task<List<TermListDto>> GetTerms()
        {
            List<Term> termsFromDatabase = await _termRepository.GetAllListAsync();
            return termsFromDatabase.Select(term => new TermListDto()
            {
                Id = term.Id,
                Name = term.Name,
                Days = term.Days,
                CreationTime = term.CreationTime,
            }).ToList();
        }

        /// <summary>
        /// Request to update a term.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task UpdateTerm(UpdateTermInput input)
        {
            Term termFromDatabase = await _termRepository.GetAsync(input.Id);

            termFromDatabase.Name = input.Name;
            termFromDatabase.Days = input.Days;
            await _termRepository.UpdateAsync(termFromDatabase);
        }
    }
}