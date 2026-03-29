"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
dotenv.config();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'task_master',
    entities: [__dirname + '/../infrastructure/database/entities/**/*.{ts,js}'],
    migrations: [
        __dirname + '/../infrastructure/database/migrations/**/*.{ts,js}',
    ],
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
};
var AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
// Default export for TypeORM CLI compatibility
exports.default = AppDataSource;
