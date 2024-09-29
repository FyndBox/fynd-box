import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TranslationModule } from './translation/translation.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';

        // Check if DATABASE_URL exists (for Heroku)
        if (isProduction && configService.get<string>('DATABASE_URL')) {
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: false, // Disable synchronize in production
          };
        }

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
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true, // Enable synchronize in development
          };
        }
      },
    }),
    UserModule,
    AuthModule,
    TranslationModule,
    StorageModule,
  ],
})
export class AppModule {}
