using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.EntityFrameworkCore.models;
using Test1.Terms.Dto;

namespace Test1.Terms
{
    /// <summary>
    /// This repository is the administrator of the TERM entity.
    /// </summary>
    public class TermAppService : Test1AppServiceBase, ITermAppService
    {
        private readonly IRepository<Term> _termRepository;

        /// <summary>
        /// This is the constructor of the repository.
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
        public async Task CreateTerm(CreateTermInput input)
        {
            await _termRepository.InsertAsync(new Term { Name = input.Name, Days = input.Days });
        }

        /// <summary>
        /// Request to delete a term.
        /// </summary>
        /// <param name="input"></param>
        public async Task DeleteTerm(EntityDto<int> input)
        {
            Term termFromDatabase = await _termRepository.GetAsync(input.Id);
            if (termFromDatabase != null)
                await _termRepository.DeleteAsync(termFromDatabase);
        }

        /// <summary>
        /// Request to get a term by id.
        /// </summary>
        /// <returns></returns>
        public async Task<TermDto> GetTerm(EntityDto<int> input)
        {
            Term termFromDatabase = await _termRepository.GetAsync(input.Id);
            if (termFromDatabase == null)
                return null;

            return new TermDto
            {
                Id = termFromDatabase.Id,
                Name = termFromDatabase.Name,
                Days = termFromDatabase.Days,
                CreationTime = termFromDatabase.CreationTime,
            };
        }

        /// <summary>
        /// Request to get terms.
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
        public async Task UpdateTerm(UpdateTermInput input)
        {
            Term termFromDatabase = await _termRepository.GetAsync(input.Id);
            if (termFromDatabase != null)
            {
                termFromDatabase.Name = input.Name;
                termFromDatabase.Days = input.Days;
                await _termRepository.UpdateAsync(termFromDatabase);
            }
        }
    }
}