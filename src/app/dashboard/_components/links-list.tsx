'use client';

import Link from 'next/link';
import { useState } from 'react';

import { softDeleteLinkAction } from '@/lib/server/actions';
import type { LinkWithStats } from '@/lib/server/get-current-user-links';

import LinkCard from './link-card';

type Props = {
  links: LinkWithStats[];
};

const LinksList: React.FC<Props> = ({ links: inputLinks }) => {
  const [links, setLinks] = useState(inputLinks);

  if (links.length === 0) {
    return (
      <div className="flex justify-center">
        <Link href="/" className="btn btn-lg">
          &larr; Shorten Your First Url
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-col">
      {links.map((link) => (
        <LinkCard
          key={link.id}
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
