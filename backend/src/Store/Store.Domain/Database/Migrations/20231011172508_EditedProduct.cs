using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Infrustracture.Migrations
{
    /// <inheritdoc />
    public partial class EditedProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Size",
                table: "Products",
                type: "int",
                nullable: true);
        }
    }
}
