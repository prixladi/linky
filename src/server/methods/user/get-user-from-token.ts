import { jwtVerify } from 'jose';

import { AccessTokenPayload } from './types';

type GetCurrentUserData = {
  accessToken: string;
};

const getUserFromToken = async ({
  accessToken,
}: GetCurrentUserData): Promise<AccessTokenPayload | undefined> => {
  const secretKey = Uint8Array.from('shhhhh'.split('').map((letter) => letter.charCodeAt(0)));

  const result = await jwtVerify<AccessTokenPayload>(accessToken, secretKey).catch((err) => {
    console.debug(err);
    return null;
  });

  if (!result) return undefined;
  return result.payload;
};

export default getUserFromToken;
