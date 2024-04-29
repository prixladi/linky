import { SignJWT, jwtVerify } from 'jose';

import config from '@/server-config';

type TokenData = {
  id: number;
  email: string;
};

const secretKey = Uint8Array.from(
  config.tokenSecret.split('').map((letter) => letter.charCodeAt(0)),
);

export const generateAccessToken = async (data: TokenData) => {
  const token = await generateToken(
    {
      ...data,
      type: 'access',
    },
    `${config.accessTokenDurationInSeconds} minutes`,
  );

  return {
    token,
    duration: config.accessTokenDurationInSeconds,
  };
};

export const generateRefreshToken = async (data: TokenData) => {
  const token = await generateToken(
    {
      ...data,
      type: 'refresh',
    },
    `${config.refreshTokenDurationInSeconds} minutes`,
  );

  return {
    token,
    duration: config.refreshTokenDurationInSeconds,
  };
};

export const verifyAccessToken = async (accessToken: string) =>
  verifyToken(accessToken, 'access');

export const verifyRefreshToken = async (accessToken: string) =>
  verifyToken(accessToken, 'refresh');

const verifyToken = async <T extends 'access' | 'refresh'>(token: string, type: T) => {
  const result = await jwtVerify<TokenData & { type: T }>(token, secretKey).catch((err) => {
    console.debug(err);
    return null;
  });

  if (!result) return null;

  if (result.payload.type !== type) {
    console.debug(
      `Used wrong token type for user authorization, expected '${type}' got '${result.payload.type}'`,
    );
    return null;
  }

  return result.payload;
};

const generateToken = async (data: Record<string, any>, exp: string) =>
  new SignJWT(data)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secretKey);
