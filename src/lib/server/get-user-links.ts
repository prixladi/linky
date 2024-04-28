import { getUserLinks as getUserLinksMethod } from '@/server/methods/link';
import getCurrentUser from './get-current-user';

const getUserLinks = async (id: number) => {
  return await getUserLinksMethod(id);
};

export default getUserLinks;
