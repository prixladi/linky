'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { softDeleteUserLink } from '@/server/methods/link';

import getCurrentUser from '../get-current-user';

const softDeleteLinkAction = async (linkId: number) => {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  revalidatePath('/dashboard', 'page');
  await softDeleteUserLink({ id: linkId, userId: user.id });
};

export default softDeleteLinkAction;
