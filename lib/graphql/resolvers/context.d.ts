import { knex, models, pubsub, redis } from '../../db';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

export type Context = {
	request: FastifyRequest;
	reply: FastifyReply<ServerResponse>;
	knex: typeof knex;
	models: typeof models;
	pubsub: typeof pubsub;
	redis: typeof redis;
};
