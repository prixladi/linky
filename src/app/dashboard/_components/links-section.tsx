import { getCurrentUserLinks } from '@/lib/server';

import LinksList from './links-list';

const LinksSection: React.FC = async () => {
  const links = await getCurrentUserLinks();

  return (
    <div className="flex gap-2 flex-col">
      <LinksList links={links} />
    </div>
  );
};

export default LinksSection;
