import { db } from '../../db';
import { link } from '../../db/schema';

type CreateShortenedUrlData = {
  url: string;
  userId?: number;
};

type Result = { path: string };

const createShortenedUrl = async ({ url, userId }: CreateShortenedUrlData): Promise<Result> => {
  const path = generateRandomPath(5);
  const insertedLink = await db
    .insert(link)
    .values({ url, path, userId: userId, createdAt: new Date() })
    .returning();

  return {
    path: insertedLink[0]?.path,
  };
};

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateRandomPath = (length: number) => {
  let result = '';
  for (let cnt = 0; cnt < length; cnt += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default createShortenedUrl;
