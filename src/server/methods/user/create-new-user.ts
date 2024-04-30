import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import type { Conflict } from '@/server/utils/status-errors';
import { makeConflict } from '@/server/utils/status-errors';

type Data = {
  email: string;
  password: string;
};

type Result =
  | {
      id: number;
    }
  | Conflict;

const createNewUser = async ({ email, password }: Data): Promise<Result> => {
  const lowercaseEmail = email.toLowerCase();

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, lowercaseEmail))
    .limit(1);

  if (existingUser) return makeConflict();

  const passwordHash = await bcrypt.hash(password, 10);
  const insertedUser = await db
    .insert(user)
    .values({
      email: lowercaseEmail,
      passwordHash,
      createdAt: new Date(),
      active: true,
    })
    .returning();

  return { id: insertedUser[0].id };
};

export default createNewUser;
