import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config.js';
import { getDatabaseConfig } from './config/database.config.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ProjectsModule } from './modules/projects/projects.module.js';
import { BoardsModule } from './modules/boards/boards.module.js';
import { ColumnsModule } from './modules/columns/columns.module.js';
import { TasksModule } from './modules/tasks/tasks.module.js';
import { CommentsModule } from './modules/comments/comments.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    // Global config module — loads .env automatically
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    // TypeORM database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),

    // redis cache
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 600,
      }),
    }),
    AuthModule,
    ProjectsModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    CommentsModule,
  ],
})
export class AppModule {}
