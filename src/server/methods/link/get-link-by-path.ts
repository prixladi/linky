import { eq } from 'drizzle-orm';

import { db } from '../../db';
import { link } from '../../db/schema';

type Result = { url?: string };

const getLinkByPath = async (path: string): Promise<Result> => {
  const links = await db.select().from(link).where(eq(link.path, path));
  return { url: links[0]?.url };
};

export default getLinkByPath;
