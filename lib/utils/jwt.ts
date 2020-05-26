import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import {
	GenerateToken,
	GenerateRefreshToken,
	GenerateAccessToken,
	VerifyToken,
	isTokenFunction,
	Token,
} from './index.d';

const { SECRET } = config;

/**
 * Creates a JSON web token
 */
const generateToken: GenerateToken = (userId, tokenType, expiresIn) =>
	sign({ userId, tokenType }, SECRET, { expiresIn, algorithm: 'HS256' });

/**
 * Creates a token that is used to refresh the access token.
 */
export const generateRefreshToken: GenerateRefreshToken = userId =>
	generateToken(userId, 'refresh', '3d');

/**
 * Ccreates a token that is used to access the resources in the
 * API.
 */
export const generateAccessToken: GenerateAccessToken = userId =>
	generateToken(userId, 'access', '3h');

/**
 * Verifies that the JWT was issued by this domain.
 */
export const verifyToken: VerifyToken = token => {
	try {
		return verify(token, SECRET, { algorithms: ['HS256'] });
	} catch (error) {
		console.log(error);
		return null;
	}
};

/**
 * Strictly check if a given token is of custom type
 * `Token`.
 */
export const isToken: isTokenFunction = token => {
	if (
		token &&
		(token as Token) &&
		typeof token !== 'string' &&
		(typeof (token as Token).userId === 'string' ||
			typeof (token as Token).userId === 'number') &&
		typeof (token as Token).tokenType === 'string'
	)
		return true;

	return false;
};
