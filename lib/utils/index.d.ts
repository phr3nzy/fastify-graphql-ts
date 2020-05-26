export type GenerateToken = (
	userId: number | string,
	tokenType: string,
	expiresIn: number | string,
) => string;

type TokenGenerator = (userId: number | string) => string;

type Token = {
	userId: number | string;
	tokenType: string;
};

export type GenerateAccessToken = TokenGenerator;

export type GenerateRefreshToken = TokenGenerator;

export type VerifyToken = (
	token: string,
) => Token | string | Record<string, any> | null;

export type isTokenFunction = (
	token: Token | string | Record<string, any> | null,
) => boolean;

export type Session = {
	accessToken: string;
	status: string;
};
