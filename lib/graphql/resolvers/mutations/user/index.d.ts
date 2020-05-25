import { User } from '../../../../db/models/user';
import { Context } from '../../context';
import { GraphQLResolveInfo } from 'graphql/type/definition';

type LogInArguments = {
	email: string;
	password: string;
};

type SignUpArguments = {
	newUser: {
		fullName: string;
		email: string;
		password: string;
	};
};

export type LogInMutation = (
	parent: any,
	arguments: LogInArguments,
	context: Context,
	info: GraphQLResolveInfo,
) => Promise<User> | null;

export type SignUpMutation = (
	parent: any,
	arguments: SignUpArguments,
	context: Context,
	info: GraphQLResolveInfo,
) => Promise<User> | null;
