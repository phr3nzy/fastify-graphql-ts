import BaseModel from './base';

export class User extends BaseModel {
	id?: number;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	password?: string;
	isDeleted?: boolean;
	createdAt?: string;
	updatedAt?: string;

	/**
	 * Sets the table name
	 */
	static get tableName(): string {
		return 'user_account';
	}

	/**
	 * Defines the table's schema. This is used for validation.
	 */
	static get jsonSchema(): Record<string, any> {
		return {
			type: 'object',
			required: ['fullName', 'email', 'phoneNumber', 'password'],

			properties: {
				id: { type: 'integer', readOnly: true },
				fullName: { type: 'string', minLength: 3, maxLength: 256 },
				email: { type: 'string', minLength: 3, maxLength: 256 },
				phoneNumber: { type: 'string', minLength: 3, maxLength: 32 },
				password: { type: 'string' },
				isDeleted: { type: 'boolean', default: false },
				createdAt: { type: 'string', readOnly: true },
				updatedAt: { type: 'string' },
			},
		};
	}

	/**
	 * Defines the zones relations
	 */
	static get relationMappings(): Record<string, any> {
		// Importing models here is a one way to avoid require loops.

		return {};
	}
}
