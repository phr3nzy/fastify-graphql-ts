import { Config } from 'knex';
import config from './lib/config';
import { logger } from './lib/utils/logger';

const { DATABASE_URL, LOG_LEVEL } = config;

const knexMigrationsConfig: Config = {
	client: 'pg',
	connection: DATABASE_URL,
	migrations: {
		directory: './lib/db/migrations/**/*.migration.ts',
	},
	log: {
		warn: logger.warn,
		debug: logger.debug,
		error: logger.error,
		enableColors: true,
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
