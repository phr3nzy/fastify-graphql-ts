import { ApolloError } from 'apollo-server-fastify';
import { LogInMutation, SignUpMutation } from './index.d';
import { verify, hash, argon2id } from 'argon2';

export default {
	logIn: (async (_, { email, password }, { models }, __) => {
		const { User } = models;

		const user = await User.query().findOne({ email });

		if (!user) throw new ApolloError(`User with email ${email} not found!`);

		const hashedPassword = String(user?.password);

		const passwordsMatch = await verify(hashedPassword, password, {
			version: argon2id,
			parallelism: 2,
			memoryCost: 8192,
		});

		if (!passwordsMatch) throw new ApolloError(`Invalid credentials!`);

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
