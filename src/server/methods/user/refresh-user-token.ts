import { eq } from 'drizzle-orm';
import { SignJWT, jwtVerify } from 'jose';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { RefreshTokenPayload } from './types';

type RefreshData = {
  refreshToken: string;
};

type Result =
  | {
      accessToken: string;
      accessTokenExpirationS: number;
    }
  | {
      error: 'badRequest';
    };

const refreshUserToken = async ({ refreshToken }: RefreshData): Promise<Result> => {
  const secretKey = Uint8Array.from('shhhhh'.split('').map((letter) => letter.charCodeAt(0)));

  const result = await jwtVerify<RefreshTokenPayload>(refreshToken, secretKey).catch((err) => {
    console.debug(err);
    return null;
  });

  if (!result) return { error: 'badRequest' };

  if (result.payload.type !== 'refresh') {
    console.debug(
      `Used wrong token type for user authorization, expected 'refresh' got '${result.payload.type}'`,
    );
    return {
      error: 'badRequest',
    };
  }

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, result.payload.id))
    .limit(1);

  if (!existingUser) {
    return { error: 'badRequest' };
  }

  if (!existingUser.active) {
    return { error: 'badRequest' };
  }

  const accessToken = await new SignJWT({
    id: result.payload.id,
    email: result.payload.email,
    type: 'access',
  })
    .setProtectedHeader({
      alg: 'HS256',
    }) 
    .setIssuedAt()
    .setExpirationTime('5 minutes')
    .sign(secretKey);

  return { accessToken, accessTokenExpirationS: 5 * 60 };
};

export default refreshUserToken;
