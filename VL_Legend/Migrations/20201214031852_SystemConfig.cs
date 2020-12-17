using Microsoft.EntityFrameworkCore.Migrations;

namespace VL_Legend.Migrations
{
    public partial class SystemConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "System_Config",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Keywords = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: false, maxLength: 255),
                    Phone = table.Column<string>(type: "nvarchar(20)", nullable: false, maxLength: 20),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Facebook = table.Column<string>(type: "nvarchar(500)", nullable: false, maxLength: 500),
                    Slogan = table.Column<string>(type: "nvarchar(255)",nullable: false, maxLength: 255),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Systemconfig", x => x.Id);
                }); ;
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "System_Config");
        }
    }
}
