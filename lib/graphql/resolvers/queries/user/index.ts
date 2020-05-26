import { ApolloError } from 'apollo-server-fastify';
import { UserQuery, UsersQuery } from './index.d';

export default {
	user: (async (_, { where }, { models }, __) => {
		const { User } = models;

		const user = await User.query().findOne({ ...where });

		if (!user) throw new ApolloError('User not found!');

		return user;
	}) as UserQuery,
	users: (async (_, { where, query }, { models }, __) => {
		const { User } = models;

		return await User.query()
			.where({ ...where })
			.limit(query?.limit || 10)
			.offset(query?.offset || 0);
	}) as UsersQuery,
};
