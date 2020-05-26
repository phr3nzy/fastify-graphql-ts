import { config } from 'dotenv';
import { ApolloError } from 'apollo-server-fastify';

// Populate environment variables from .env file
config();

const requiredEnvironmentVariables: string[] = [
	'NODE_ENV',
	'PORT',
	'SECRET',
	'COOKIES_SECRET',
];

requiredEnvironmentVariables.forEach(variable => {
	if (!(variable in process.env)) {
		throw new ApolloError(
			`Variable ${variable} was not declared in .env file!`,
		);
	}
});

export default {
	NODE_ENV: process.env.NODE_ENV || 'production',
	IS_DEV: process.env.NODE_ENV === 'development',
	IS_TEST: process.env.NODE_ENV === 'testing',
	IS_PROD: process.env.NODE_ENV === 'production',
	PORT: Number(process.env.PORT) || 3000,
	SECRET: process.env.SECRET || 'super_secret',
	COOKIES_SECRET: process.env.COOKIES_SECRET || 'super_cookies_secret',
	DATABASE_URL:
		process.env.DATABASE_URL ||
		'postgres://fastify-gql-ts:password@127.0.0.1:5432/fastify-gql-ts-db',
	REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379/',
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',
	DISABLE_LOGGING: Boolean(process.env.DISABLE_LOGGING) || false,
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
	WEB_DOMAIN: process.env.WEB_DOMAIN || 'fastify-gql-ts.com',
};
