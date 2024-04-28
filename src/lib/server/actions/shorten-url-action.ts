'use server';

import { getCurrentUser } from '@/lib/server';
import { createShortenedUrl } from '@/server/methods/link';
import { revalidatePath } from 'next/cache';

const shortenUrlAction = async (url: string) => {
  const currentUser = await getCurrentUser();
  const result = await createShortenedUrl({ url, userId: currentUser?.id });
  if (currentUser) revalidatePath('/dashboard', 'page');
  return result;
};

export default shortenUrlAction;
