import { eq, sql } from 'drizzle-orm';

import { db } from '../../db';
import { link, stat } from '../../db/schema';

type Result = { url?: string };

type Options = {
  incrementStat: boolean;
};

const getLinkByPath = async (path: string, { incrementStat }: Options): Promise<Result> => {
  const [dbLink] = await db.select().from(link).where(eq(link.path, path));

  if (dbLink && incrementStat) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    await db
      .insert(stat)
      .values({
        date: now,
        linkId: dbLink.id,
        hitCount: 1,
      })
      .onConflictDoUpdate({
        target: [stat.date, stat.linkId],
        set: {
          hitCount: sql`${stat.hitCount} + 1`,
        },
      });
  }

  return { url: dbLink?.url };
};

export default getLinkByPath;
