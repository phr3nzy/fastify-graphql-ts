import { jwt, errors } from '../../../../utils';
import { Token, Session } from '../../../../utils/index.d';
import { UserQuery, UsersQuery, GetAccessTokenQuery } from './index.d';

export default {
	user: (async (_, { where }, { models }, __) => {
		const { User } = models;
		const { NotFoundError } = errors;

		const user = await User.query().findOne({ ...where });

		if (!user) throw new NotFoundError('User not found!');

		return user;
	}) as UserQuery,

	users: (async (_, { where, query }, { models }, __) => {
		const { User } = models;

		return await User.query()
			.where({ ...where })
			.limit(query?.limit || 10)
			.offset(query?.offset || 0);
	}) as UsersQuery,

	getAccessToken: (async (_, { refreshToken }, { redis }, __) => {
		const { verifyToken, isToken, generateAccessToken } = jwt;
		const { BadRequestError, NotFoundError } = errors;

		const parsedToken = verifyToken(refreshToken);

		// If the parsedToken isn't a token, or it's `tokenType` isn't 'refresh',
		// throw an error.
		if (!isToken(parsedToken) || (parsedToken as Token).tokenType !== 'refresh')
			throw new BadRequestError(`Invalid token!`);

		// Fetch the session instance from redis
		const sessionJSON = await redis.get(
			`refreshToken:userId-${(parsedToken as Token).userId}`,
		);

		if (!sessionJSON) throw new NotFoundError('Session not found!');

		const session: Session = JSON.parse(sessionJSON);

		if (session.status === 'ACTIVE') {
			return {
				accessToken: generateAccessToken((parsedToken as Token).userId),
			};
		} else {
			throw new BadRequestError(`Session expired!`);
		}
	}) as GetAccessTokenQuery,
};
