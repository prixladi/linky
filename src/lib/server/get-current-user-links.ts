import { getUserLinksWithStats } from '@/server/methods/stats';
import type { LinkWithStats } from '@/server/methods/stats/get-user-links-with-stats';

import { getCurrentUserOrRedirect } from './get-current-user';

export type { LinkWithStats };

export const getCurrentUserLinks = async (): Promise<LinkWithStats[]> => {
  const currentUser = await getCurrentUserOrRedirect();
  return getUserLinksWithStats(currentUser.id);
};
