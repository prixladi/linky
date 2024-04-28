import { jwtVerify } from 'jose';

import { AccessTokenPayload } from './types';

type GetCurrentUserData = {
  accessToken: string;
};

type Result = {
  id: number;
  email: string;
};

const getUserFromToken = async ({
  accessToken,
}: GetCurrentUserData): Promise<Result | undefined> => {
  const secretKey = Uint8Array.from('shhhhh'.split('').map((letter) => letter.charCodeAt(0)));

  const result = await jwtVerify<AccessTokenPayload>(accessToken, secretKey).catch((err) => {
    console.debug(err);
    return null;
  });

  if (!result) return undefined;
  if (result.payload.type !== 'access') {
    console.debug(
      `Used wrong token type for user authorization, expected 'access' got '${result.payload.type}'`,
    );
    return undefined;
  }

  return {
    id: result.payload.id,
    email: result.payload.email,
  };
};

export default getUserFromToken;
