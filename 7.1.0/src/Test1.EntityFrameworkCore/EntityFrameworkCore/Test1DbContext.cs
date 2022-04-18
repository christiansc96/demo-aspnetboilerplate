using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Test1.Authorization.Roles;
using Test1.Authorization.Users;
using Test1.EntityFrameworkCore.models;
using Test1.MultiTenancy;

namespace Test1.EntityFrameworkCore
{
    public class Test1DbContext : AbpZeroDbContext<Tenant, Role, User, Test1DbContext>
    {
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Term> Terms { get; set; }

        public Test1DbContext(DbContextOptions<Test1DbContext> options)
            : base(options)
        {
        }
    }
}