using Microsoft.EntityFrameworkCore.Migrations;

namespace VL_Legend.Migrations
{
    public partial class course : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Descriptions = table.Column<string>(nullable: false),
                    EnrollKey = table.Column<string>(nullable: true),
                    Class_Id = table.Column<long>(nullable:true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey("FK_Course_Classroom", x => x.Class_Id, "Classroom", "Id");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Courses");
        }
    }
}
