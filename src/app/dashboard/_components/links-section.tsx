import { getCurrentUserLinks } from '@/lib/server';

import { LinksList } from './links-list';

export const LinksSection: React.FC = async () => {
  const links = await getCurrentUserLinks();

  return (
    <div className="flex flex-col gap-2">
      <LinksList links={links} />
    </div>
  );
};
