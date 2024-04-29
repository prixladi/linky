'use client';

import { useState } from 'react';

import { softDeleteLinkAction } from '@/lib/server/actions';
import type { LinkWithStats } from '@/lib/server/get-current-user-links';

import Link from './link-card';

type Props = {
  links: LinkWithStats[];
};

const LinksList: React.FC<Props> = ({ links: inputLinks }) => {
  const [links, setLinks] = useState(inputLinks);

  return (
    <div className="flex gap-2 flex-col">
      {links.map((link) => (
        <Link
          link={link}
          onRemove={async () => {
            await softDeleteLinkAction(link.id);
            setLinks((oldLinks) => oldLinks.filter(({ id }) => id !== link.id));
          }}
        />
      ))}
    </div>
  );
};

export default LinksList;
