"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
var getDatabaseConfig = function (configService) { return ({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'root'),
    database: configService.get('DB_NAME', 'task_master'),
    entities: [
        __dirname + '/../infrastructure/database/entities/**/*.entity.{ts,js}',
    ],
    migrations: [
        __dirname + '/../infrastructure/database/migrations/**/*.{ts,js}',
    ],
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: configService.get('DB_SYNCHRONIZE', 'false') === 'true',
    logging: configService.get('DB_LOGGING', 'true') === 'true',
    autoLoadEntities: true,
}); };
exports.getDatabaseConfig = getDatabaseConfig;
