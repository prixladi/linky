import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';

type RegisterData = {
  email: string;
  password: string;
};

type Result =
  | {
      id: number;
    }
  | {
      error: 'conflict';
    };

const createNew = async ({ email, password }: RegisterData): Promise<Result> => {
  const lowercaseEmail = email.toLowerCase();

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, lowercaseEmail))
    .limit(1);

  if (existingUser[0]) return { error: 'conflict' };

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

export default createNew;
