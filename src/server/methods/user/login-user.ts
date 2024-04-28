import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';

type LoginData = {
  email: string;
  password: string;
};

type Result =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | {
      error: 'badRequest';
    };

const loginUser = async ({ email, password }: LoginData): Promise<Result> => {
  const lowercaseEmail = email.toLowerCase();

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, lowercaseEmail))
    .limit(1);

  if (!existingUser || !(await bcrypt.compare(password, existingUser.passwordHash))) {
    return { error: 'badRequest' };
  }

  const secretKey = Uint8Array.from('shhhhh'.split('').map((letter) => letter.charCodeAt(0)));

  const accessToken = await new SignJWT({
    id: existingUser.id,
    email: existingUser.email,
    type: 'access',
  })
    .setProtectedHeader({
      alg: 'HS256',
    }) // algorithm
    .setIssuedAt()
    .setExpirationTime('5 minutes')
    .sign(secretKey);

  const refreshToken = await new SignJWT({
    id: existingUser.id,
    type: 'refresh',
  })
    .setProtectedHeader({
      alg: 'HS256',
    }) // algorithm
    .setIssuedAt()
    .setExpirationTime('4 weeks')
    .sign(secretKey);

  return { accessToken, refreshToken };
};

export default loginUser;
