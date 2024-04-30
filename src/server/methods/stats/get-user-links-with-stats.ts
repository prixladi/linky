import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { link, stat } from '@/server/db/schema';

type Response = LinkWithStats[];

export type LinkWithStats = {
  id: number;
  path: string;
  url: string;
  createdAt: Date;
  totalHitCount: number;
  hitRecords: { hitCount: number; date: Date }[];
};

export const getUserLinksWithStats = async (userId: number): Promise<Response> => {
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

  return convertLinks(dbRecords).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

type DbRecord = {
  id: number;
  url: string;
  path: string;
  createdAt: Date;
  date: Date | null;
  hitCount: number | null;
};

const convertLinks = (dbRecords: DbRecord[]): LinkWithStats[] => {
  const result = dbRecords.reduce<Record<number, LinkWithStats>>((linkMap, dbRecord) => {
    if (!linkMap[dbRecord.id]) {
      linkMap[dbRecord.id] = {
        id: dbRecord.id,
        url: dbRecord.url,
        path: dbRecord.path,
        createdAt: dbRecord.createdAt,
        hitRecords: [],
        totalHitCount: 0,
      };
    }

    if (dbRecord.hitCount && dbRecord.date) {
      linkMap[dbRecord.id].totalHitCount += dbRecord.hitCount;
      linkMap[dbRecord.id].hitRecords.push({
        hitCount: dbRecord.hitCount,
        date: dbRecord.date,
      });
    }

    return linkMap;
  }, {});

  return Object.values(result);
};
