using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Test1.Migrations
{
    public partial class DeleteInvoiceDetailTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvoiceDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InvoiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceId = table.Column<int>(type: "int", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false),
                    QTY = table.Column<int>(type: "int", nullable: false),
                    TotalLine = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoiceDetails_Invoices_Id",
                        column: x => x.Id,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
