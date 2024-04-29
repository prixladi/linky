'use server';

import { redirect } from 'next/navigation';
import getCurrentUser from '../get-current-user';
import { softDeleteUserLink } from '@/server/methods/link';
import { revalidatePath } from 'next/cache';

const softDeleteLinkAction = async (linkId: number) => {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  revalidatePath('/dashboard', 'page');
  await softDeleteUserLink({ id: linkId, userId: user.id });
};

export default softDeleteLinkAction;
