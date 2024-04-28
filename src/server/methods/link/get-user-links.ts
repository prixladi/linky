import { db } from '@/server/db';
import { link } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';

const getUserLinks = async (userId: number) => {
  const links = await db
    .select()
    .from(link)
    .where(and(eq(link.user, userId), eq(link.deleted, false)));

  return links.map(({ id, url, path }) => ({ id, url, path }));
};

export default getUserLinks;
