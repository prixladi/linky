'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/lib/server';
import { createShortenedUrl } from '@/server/methods/link';

export const shortenUrlAction = async (url: string) => {
  const currentUser = await getCurrentUser();
  const result = await createShortenedUrl({ url, userId: currentUser?.id });
  if (currentUser) revalidatePath('/dashboard', 'page');
  return result;
};
