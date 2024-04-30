import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { generateAccessToken, generateRefreshToken } from '@/server/utils/jwt';
import type { BadRequest } from '@/server/utils/status-errors';
import { makeBadRequest } from '@/server/utils/status-errors';

type Data = {
  email: string;
  password: string;
};

type Result =
  | {
      accessToken: string;
      accessTokenExpirationS: number;
      refreshToken: string;
    }
  | BadRequest;

const loginUser = async ({ email, password }: Data): Promise<Result> => {
  const lowercaseEmail = email.toLowerCase();

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, lowercaseEmail))
    .limit(1);

  if (!existingUser || !(await bcrypt.compare(password, existingUser.passwordHash))) {
    return makeBadRequest();
  }

  const accessTokenResult = await generateAccessToken({
    id: existingUser.id,
    email: existingUser.email,
  });

  const refreshTokenResult = await generateRefreshToken({
    id: existingUser.id,
    email: existingUser.email,
  });

  return {
    accessToken: accessTokenResult.token,
    refreshToken: refreshTokenResult.token,
    accessTokenExpirationS: accessTokenResult.duration,
  };
};

export default loginUser;
