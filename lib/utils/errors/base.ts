import { ApolloError } from 'apollo-server-fastify';

export class BaseError extends ApolloError {
	constructor(message: string | Record<string, any>, errorName: string) {
		if (message instanceof Object) {
			super(JSON.stringify(message), errorName);
		} else {
			super(message, errorName);
		}
	}
}
