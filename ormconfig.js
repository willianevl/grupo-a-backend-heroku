require('dotenv').config();

let config = {};

if (process.env.NODE_ENV.toString() === "test") {
    config = {
        type: 'sqlite',
        database: './testdb.db',
        entities: [
            'src/core/infra/data/database/entities/**/*'
        ],
        migrations: [
            'src/core/infra/data/database/migrations/**/*'
        ],
    }
} else {
    config = {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: false,
        extra: {
            ssl: {
                rejectUnauthorized: false
            }
        },
        migrations: [
            `${process.env.DB_PATH}/migrations/**/*`
        ],
        entities: [
            `${process.env.DB_PATH}/entities/**/*`
        ],
        cli: {
            entitiesDir: 'src/core/infra/data/database/entities',
            migrationsDir: 'src/core/infra/data/database/migrations'
        }
    };
}

module.exports = config;