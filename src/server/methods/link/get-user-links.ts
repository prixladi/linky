import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { link } from '@/server/db/schema';

const getUserLinks = async (userId: number) => {
  const links = await db
    .select()
    .from(link)
    .where(and(eq(link.user, userId), eq(link.deleted, false)))
    .orderBy(desc(link.createdAt));

  return links.map(({ id, url, path }) => ({ id, url, path }));
};

export default getUserLinks;
