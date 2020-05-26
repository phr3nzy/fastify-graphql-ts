import { ApolloError } from 'apollo-server-fastify';
import { LogInMutation, SignUpMutation } from './index.d';
import { verify, hash, argon2id } from 'argon2';
import { jwt } from '../../../../utils';
import config from '../../../../config';

export default {
	logIn: (async (_, { email, password }, { models, reply, redis }, __) => {
		const { User } = models;
		const { WEB_DOMAIN, IS_PROD } = config;

		const user = await User.query().findOne({ email });

		if (!user) throw new ApolloError(`User with email ${email} not found!`);

		const hashedPassword = String(user?.password);

		const passwordsMatch = await verify(hashedPassword, password, {
			version: argon2id,
			parallelism: 2,
			memoryCost: 8192,
		});

		if (!passwordsMatch) throw new ApolloError(`Invalid credentials!`);

		// Create a refresh token for the user
		const refreshToken = jwt.generateRefreshToken(Number(user.id));

		// Get the date 3 days from now
		const threeDaysFromNow = new Date(
			new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
		);

		// Store the user session
		await redis.set(
			`refreshToken:userId-${user.id}`,
			JSON.stringify({ refreshToken, status: 'ACTIVE' }),
			'3d',
		);

		// Set cookie defaults
		const cookieOptions = {
			domain: WEB_DOMAIN,
			httpOnly: true,
			expires: threeDaysFromNow,
			secure: IS_PROD,
		};

		// Set the refresh cookie
		reply.setCookie('refresh', refreshToken, {
			...cookieOptions,
			sameSite: 'lax',
			signed: true,
			maxAge: 7 * 24 * 60 * 60, // 1 week
		});

		return user;
	}) as LogInMutation,

	signUp: (async (_, { newUser }, { models }, __) => {
		const { User } = models;

		const { email, fullName, password } = newUser;

		const user = await User.query().findOne({ email });

		if (user) throw new ApolloError(`User with email ${email} already exists!`);

		const hashedPassword = await hash(password, {
			version: argon2id,
			parallelism: 2,
			memoryCost: 8192,
		});

		return await User.query().insertAndFetch({
			email,
			fullName,
			password: hashedPassword,
		});
	}) as SignUpMutation,
};
