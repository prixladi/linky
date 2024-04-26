import { eq } from 'drizzle-orm';

import { db } from '../db';
import { item } from '../db/schema';

type Result = { url?: string };

const getLinkByPath = async (path: string): Promise<Result> => {
  const links = await db.select().from(item).where(eq(item.path, path));
  return { url: links[0]?.url };
};

export default getLinkByPath;
