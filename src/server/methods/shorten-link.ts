import { db } from '../db';
import { item } from '../db/schema';

const shortenLink = async (url: string) => {
  const path = generateRandomPath(7);
  const insertedItem = await db
    .insert(item)
    .values({ url: url, path })
    .returning();

  return insertedItem[0];
};

const generateRandomPath = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export default shortenLink;
