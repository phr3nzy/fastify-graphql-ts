import pino from 'pino';
import config from '../config';

const { IS_DEV, LOG_LEVEL, DISABLE_LOGGING } = config;

export const logger = pino({
	name: 'fastify-gql-ts-api',
	level: LOG_LEVEL,
	enabled: !DISABLE_LOGGING,
	prettyPrint: IS_DEV,
	timestamp: true,
});
