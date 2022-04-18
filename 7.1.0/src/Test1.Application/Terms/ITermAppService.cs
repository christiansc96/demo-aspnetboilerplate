using System.Threading.Tasks;
using Test1.Terms.Dto;

namespace Test1.Terms
{
    public interface ITermAppService
    {
        Task CreateTerm(CreateTermInput input);
    }
}