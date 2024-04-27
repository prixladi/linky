import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const login = async ({ email, password }: LoginData): Promise<Result> => {
  const lowercaseEmail = email.toLowerCase();

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, lowercaseEmail))
    .limit(1);

  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.passwordHash))
  ) {
    return { error: 'badRequest' };
  }

  const now = Date.now();

  const accessToken = jwt.sign(
    {
      id: existingUser.id,
      type: 'access',
    },
    'shhhhh',
    {
      expiresIn: 60 * 5, // 5 minutes
    }
  );

  const refreshToken = jwt.sign(
    {
      id: existingUser.id,
      type: 'refresh',
    },
    'shhhhh',
    {
      expiresIn: 60 * 60 * 24 * 30, // month
    }
  );

  return { accessToken, refreshToken };
};

export default login;
