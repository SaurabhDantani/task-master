import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'root'),
  database: configService.get<string>('DB_NAME', 'task_master'),
  entities: [
    __dirname + '/../infrastructure/database/entities/**/*.entity.{ts,js}',
  ],
  migrations: [
    __dirname + '/../infrastructure/database/migrations/**/*.{ts,js}',
  ],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
  logging: configService.get<string>('DB_LOGGING', 'true') === 'true',
  autoLoadEntities: true,
});
