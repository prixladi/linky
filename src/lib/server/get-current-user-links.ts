import { getUserLinks } from '@/server/methods/link';

import getCurrentUser from './get-current-user';
import { LinkWithStats } from '@/server/methods/link/types';

export type { LinkWithStats };

const getCurrentUserLinks = async (): Promise<LinkWithStats[]> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];
  return getUserLinks(currentUser.id);
};

export default getCurrentUserLinks;
