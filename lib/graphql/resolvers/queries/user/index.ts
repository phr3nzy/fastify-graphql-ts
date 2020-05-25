import { UserQuery, UsersQuery } from './index.d';

export default {
	user: (async (_, { where }, { models }, __) => {
		const { User } = models;

		return await User.query().findOne({ ...where });
	}) as UserQuery,
	users: (async (_, { where, query }, { models }, __) => {
		const { User } = models;

		return await User.query()
			.where({ ...where })
			.limit(query?.limit || 10)
			.offset(query?.offset || 0);
	}) as UsersQuery,
};
