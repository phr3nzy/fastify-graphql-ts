export type GenerateToken = (
	userId: number | string,
	tokenType: string,
	expiresIn: number | string,
) => string;

type TokenGenerator = (userId: number | string) => string;

export type GenerateAccessToken = TokenGenerator;

export type GenerateRefreshToken = TokenGenerator;

export type VerifyToken = (token: string) => string | Record<string, any>;
