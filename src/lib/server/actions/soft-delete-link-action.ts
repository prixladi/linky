'use server';

import { revalidatePath } from 'next/cache';

import { softDeleteUserLink } from '@/server/methods/link';

import { getCurrentUserOrRedirect } from '../get-current-user';

export const softDeleteLinkAction = async (linkId: number) => {
  const user = await getCurrentUserOrRedirect();
  revalidatePath('/dashboard', 'page');
  await softDeleteUserLink({ id: linkId, userId: user.id });
};
