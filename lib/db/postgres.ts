import Knex from 'knex';
import { Model } from 'objection';
import models from './models';
import config from '../config';
import { logger } from '../utils';

const { IS_PROD, DATABASE_URL, LOG_LEVEL } = config;

const knex = Knex({
	pool: {
		min: 2,
		max: 64,
	},
	client: 'pg',
	connection: IS_PROD ? `${DATABASE_URL}?ssl=true` : DATABASE_URL,
	debug: LOG_LEVEL === 'debug',
	log: {
		debug: logger.debug,
		error: logger.error,
		warn: logger.warn,
		enableColors: !IS_PROD,
	},
});

Model.knex(knex);

export { knex, models };
