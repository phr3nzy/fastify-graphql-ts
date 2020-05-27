import { BaseError } from './base';

export class BadRequestError extends BaseError {
	constructor(message: string | Record<string, any>) {
		super(message, 'BAD_REQUEST');
	}
}
