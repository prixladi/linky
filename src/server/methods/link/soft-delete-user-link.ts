import { and, eq } from 'drizzle-orm';

import { db } from '../../db';
import { link } from '../../db/schema';

type Data = {
  id: number;
  userId: number;
};

type Result = { success: boolean };

const softDeleteUserLink = async ({ id, userId }: Data): Promise<Result> => {
  const [result] = await db
    .update(link)
    .set({ deleted: true })
    .where(and(eq(link.id, id), eq(link.userId, userId)))
    .returning();

  return { success: Boolean(result) };
};

export default softDeleteUserLink;
