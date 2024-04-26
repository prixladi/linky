import { db } from '../db';
import { item } from '../db/schema';

type Result = { path: string };

const shortenUrl = async (url: string): Promise<Result> => {
  const path = generateRandomPath(5);
  const insertedItem = await db.insert(item).values({ url, path }).returning();

  return {
    path: insertedItem[0]?.path,
  };
};

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateRandomPath = (length: number) => {
  let result = '';
  for (let cnt = 0; cnt < length; cnt++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default shortenUrl;
