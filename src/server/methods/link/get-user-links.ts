import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { link, stat } from '@/server/db/schema';

type LinkWithStats = {
  id: number;
  path: string;
  url: string;
  createdAt: Date;
  totalHitCount: number;
  hitRecords: { hitCount: number; date: Date }[];
};

type DbRecord = {
  id: number;
  url: string;
  path: string;
  createdAt: Date;
  date: Date | null;
  hitCount: number | null;
};

const getUserLinks = async (userId: number) => {
  const dbRecords = await db
    .select({
      id: link.id,
      url: link.url,
      path: link.path,
      createdAt: link.createdAt,
      date: stat.date,
      hitCount: stat.hitCount,
    })
    .from(stat)
    .rightJoin(link, eq(link.id, stat.linkId))
    .where(and(eq(link.userId, userId), eq(link.deleted, false)))
    .orderBy(asc(stat.date));

  return convertLinks(dbRecords).sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

const convertLinks = (links: DbRecord[]): LinkWithStats[] => {
  const linkMap: Record<number, LinkWithStats> = {};

  for (const link of links) {
    if (!linkMap[link.id]) {
      linkMap[link.id] = {
        id: link.id,
        url: link.url,
        path: link.path,
        createdAt: link.createdAt,
        hitRecords: [],
        totalHitCount: 0,
      };
    }

    if (link.hitCount && link.date) {
      linkMap[link.id].totalHitCount += link.hitCount;
      linkMap[link.id].hitRecords.push({
        hitCount: link.hitCount,
        date: link.date,
      });
    }
  }

  return Object.values(linkMap);
};

export default getUserLinks;
