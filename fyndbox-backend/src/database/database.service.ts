import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',
      password: 'password',
      port: 5432,
    });
    this.client.connect();
  }

  async createDatabaseIfNotExists(dbName: string) {
    const res = await this.client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );
    if (res.rowCount === 0) {
      await this.client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
