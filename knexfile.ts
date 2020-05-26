import { Config } from 'knex';
import config from './lib/config';

const { DATABASE_URL, LOG_LEVEL } = config;

const knexMigrationsConfig: Config = {
	client: 'pg',
	connection: DATABASE_URL,
	migrations: {
		directory: './lib/db/migrations/**/*.migration.ts',
	},
	debug: LOG_LEVEL === 'debug',
};

module.exports = {
	testing: {
		...knexMigrationsConfig,
	},
	development: {
		...knexMigrationsConfig,
	},
};
