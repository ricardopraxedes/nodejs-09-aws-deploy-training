import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCar1617468581534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "daily_rate", type: "numeric" },
          { name: "available", type: "boolean", default: true },
          { name: "license_plate", type: "varchar" },
          { name: "category_id", type: "uuid" },
          { name: "fine_amount", type: "numeric" },
          { name: "brand", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKCategoryCar",
            referencedTableName: "categories",
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
