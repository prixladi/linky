import { and, eq } from 'drizzle-orm';

import type { BadRequest} from '@/server/utils/status-errors';
import { makeBadRequest } from '@/server/utils/status-errors';

import { db } from '../../db';
import { link } from '../../db/schema';

type Data = {
  id: number;
  userId: number;
};

type Result = { id: number } | BadRequest;

const softDeleteUserLink = async ({ id, userId }: Data): Promise<Result> => {
  const [result] = await db
    .update(link)
    .set({ deleted: true })
    .where(and(eq(link.id, id), eq(link.userId, userId)))
    .returning();

  if (!result) return makeBadRequest();
  return { id: result.id };
};

export default softDeleteUserLink;
