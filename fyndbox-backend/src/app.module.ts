import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const dbName = configService.get<string>('DB_NAME');
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT');
        const dbUser = configService.get<string>('DB_USERNAME');
        const dbPassword = configService.get<string>('DB_PASSWORD');

        // Create a temporary DataSource to connect to the 'postgres' database
        const tempDataSource = new DataSource({
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: 'postgres', // Connect to default database
        });

        await tempDataSource.initialize();

        // Check if the target database exists
        const result = await tempDataSource.query(
          `SELECT 1 FROM pg_database WHERE datname = $1`,
          [dbName],
        );

        if (result.length === 0) {
          // Database does not exist, create it
          await tempDataSource.query(`CREATE DATABASE "${dbName}"`);
          console.log(`Database ${dbName} created successfully.`);
        } else {
          console.log(`Database ${dbName} already exists.`);
        }

        // Close the temporary connection
        await tempDataSource.destroy();

        // Now return the TypeORM configuration to connect to the target database
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Disable in production
        };
      },
    }),
    UserModule,
    AuthModule,
    TranslationModule,
  ],
})
export class AppModule {}
