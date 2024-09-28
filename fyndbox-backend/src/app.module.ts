import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Enable global environment configuration
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Asynchronously configure TypeORM for production and development
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        if (isProduction) {
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'), // Use DATABASE_URL from Heroku
            autoLoadEntities: true,
            synchronize: false, // Disable synchronize for production (use migrations)
            ssl: {
              rejectUnauthorized: false, // Required for Heroku Postgres SSL
            },
          };
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
  ],
})
export class AppModule {}
