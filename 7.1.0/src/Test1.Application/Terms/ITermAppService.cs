using System.Threading.Tasks;
using Test1.Terms.Dto;

namespace Test1.Terms
{
    /// <summary>
    /// This repository is the administrator of the TERM entity.
    /// </summary>
    public interface ITermAppService
    {
        /// <summary>
        /// Request to create a new term.
        /// </summary>
        /// <param name="input"></param>
        Task CreateTerm(CreateTermInput input);
    }
}