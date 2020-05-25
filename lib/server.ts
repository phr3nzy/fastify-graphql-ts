import http from 'http';
import fastify, { ServerFactoryFunction } from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { logger } from './utils';
import { knex, models, pubsub, redis } from './db';
import config from './config';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

const graphqlServer = new ApolloServer({
	typeDefs,
	resolvers,
	logger,
	context: request => ({
		request,
		reply: request.reply,
		knex,
		models,
		pubsub,
		redis,
	}),
	tracing: !config.IS_PROD,
	introspection: !config.IS_PROD,
	playground: !config.IS_PROD,
	debug: !config.IS_PROD,
});

const serverFactory: ServerFactoryFunction = (handler, opts) => {
	const httpServer = http.createServer((request, response) => {
		handler(request, response);
	});

	graphqlServer.installSubscriptionHandlers(httpServer);

	return httpServer;
};

const server = fastify({
	logger,
	serverFactory,
	ignoreTrailingSlash: true,
	bodyLimit: 8 * 1024,
	trustProxy: true,
});

server.register(
	graphqlServer.createHandler({
		path: '/',
		cors: {
			methods: ['GET', 'PUT', 'POST'],
			credentials: false,
			preflightContinue: false,
			maxAge: 86400,
			origin: ['*', /^https?:\/\/localhost(?:\:[0-9]{1,4})?\/?[\s]?$/],
		},
		disableHealthCheck: !config.IS_PROD,
	}),
);

export { server };
