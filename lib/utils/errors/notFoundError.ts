import { BaseError } from './base';

export class NotFoundError extends BaseError {
	constructor(message: string | Record<string, any>) {
		super(message, 'NOT_FOUND');
	}
}
