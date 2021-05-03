import { Connection, createConnection, getConnectionOptions } from "typeorm";

async function createDBConnection(): Promise<Connection> {
  const newOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(newOptions, {
      database:
        process.env.NODE_ENV === "test" ? "test_db" : newOptions.database,
    })
  );
}

export { createDBConnection };
