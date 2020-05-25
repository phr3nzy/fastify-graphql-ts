import { gql } from 'apollo-server-fastify';

export default gql`
	type User {
		id: Int!
		fullName: String!
		email: String!
		password: String!
		isDeleted: Boolean!
		createdAt: String!
		updatedAt: String!
	}

	type Query {
		user(where: UserWhereInput!): User!
		users(where: UsersWhereInput, query: UsersQueryInput): [User!]
	}

	input UserWhereInput {
		id: Int
		email: String
	}

	input UsersWhereInput {
		is_deleted: Boolean
	}

	input UsersQueryInput {
		limit: Int!
		offset: Int!
	}
`;
