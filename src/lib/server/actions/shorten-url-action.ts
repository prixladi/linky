'use server';

import { getCurrentUser } from '@/lib/server';
import { createShortenedUrl } from '@/server/methods/link';

const shortenUrlAction = async (url: string) => {
  const currentUser = await getCurrentUser();
  return await createShortenedUrl({ url, userId: currentUser?.id });
};

export default shortenUrlAction;
