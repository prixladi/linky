import { getUserLinksWithStats } from '@/server/methods/stats';
import type { LinkWithStats } from '@/server/methods/stats/get-user-links-with-stats';

import getCurrentUser from './get-current-user';

export type { LinkWithStats };

const getCurrentUserLinks = async (): Promise<LinkWithStats[]> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];
  return getUserLinksWithStats(currentUser.id);
};

export default getCurrentUserLinks;
