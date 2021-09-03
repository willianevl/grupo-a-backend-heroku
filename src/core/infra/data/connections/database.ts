import { Connection, createConnection } from "typeorm";

export default class Database {
  private static connection: Connection;

  public static getConnection(): Connection {
    if (!Database.connection) {
      throw new Error("DATABASE_CONNECTION_NOT_FOUND");
    }

    return Database.connection;
  }

  public async openConnection(): Promise<void> {
    if (!Database.connection) {
      Database.connection = await createConnection();
    }
  }

  public async disconnectDatabase() {
    if (!Database.connection) {
      throw new Error("DATABASE_CONNECTION_NOT_FOUND");
    }

    await Database.connection.close();
  }
}
