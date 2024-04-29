import { getUserLinks } from '@/server/methods/link';
import type { LinkWithStats } from '@/server/methods/link/types';

import getCurrentUser from './get-current-user';

export type { LinkWithStats };

const getCurrentUserLinks = async (): Promise<LinkWithStats[]> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];
  return getUserLinks(currentUser.id);
};

export default getCurrentUserLinks;
