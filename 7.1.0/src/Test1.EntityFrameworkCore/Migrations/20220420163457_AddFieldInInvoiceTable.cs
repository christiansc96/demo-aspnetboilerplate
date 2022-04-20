using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Test1.Migrations
{
    public partial class AddFieldInInvoiceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "Invoices",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "Invoices");
        }
    }
}
