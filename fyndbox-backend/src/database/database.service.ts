import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      user: this.configService.get<string>('DB_SUPERUSER'),
      host: this.configService.get<string>('DB_HOST'),
      password: this.configService.get<string>('DB_SUPERUSER_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
      database: 'postgres', // Connect to default postgres database first
    });
    this.client.connect();
  }

  async createDatabaseIfNotExists() {
    const dbName = this.configService.get<string>('DB_NAME');
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

  async createRoleIfNotExists() {
    const rolePassword = this.configService.get<string>('DB_PASSWORD');
    const res = await this.client.query(
      `SELECT 1 FROM pg_roles WHERE rolname = 'postgres'`,
    );
    if (res.rowCount === 0) {
      await this.client.query(
        `CREATE ROLE postgres WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD '${rolePassword}';`,
      );
      console.log('Role "postgres" created successfully.');
    } else {
      console.log('Role "postgres" already exists.');
    }
  }

  async onModuleInit() {
    await this.createRoleIfNotExists();
    await this.createDatabaseIfNotExists();
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
