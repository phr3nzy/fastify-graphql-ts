import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import {
	GenerateToken,
	GenerateRefreshToken,
	GenerateAccessToken,
	VerifyToken,
} from './index.d';

const { SECRET } = config;

/**
 * Creates a JSON web token
 */
const generateToken: GenerateToken = (userId, tokenType, expiresIn) =>
	sign({ userId, tokenType }, SECRET, { expiresIn });

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
export const verifyToken: VerifyToken = token => verify(token, SECRET);
