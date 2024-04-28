import { getUserLinks } from '@/server/methods/link';

import getCurrentUser from './get-current-user';

const getCurrentUserLinks = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];
  return getUserLinks(currentUser.id);
};

export default getCurrentUserLinks;
