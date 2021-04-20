import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddColumnPhotoUrl1617317647615
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "photoName",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "photoName");
  }
}
