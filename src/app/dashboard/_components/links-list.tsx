'use client';

import { useState } from 'react';

import { Button, Icon } from '@/components';
import { copyToClipboard, makeShortenedLink } from '@/lib';
import { softDeleteLinkAction } from '@/lib/server/actions';
import type { LinkWithStats } from '@/lib/server/get-current-user-links';

type Props = {
  links: LinkWithStats[];
};

const LinksList: React.FC<Props> = ({ links: inputLinks }) => {
  const [links, setLinks] = useState(inputLinks);

  return (
    <div className="flex gap-2 flex-col">
      {links.map(({ id, url, path, totalHitCount, hitRecords }) => (
        <div
          key={id}
          className="card card-compact bg-base-100 shadow-md flex-col sm:flex-row justify-between"
        >
          <div className="card-body gap-1">
            <h2 className="card-title text-md mb-0">
              <div
                onClick={() => copyToClipboard(makeShortenedLink(path))}
                role="button"
                className="badge badge-neutral  cursor-pointer"
              >
                /{path}
              </div>
              <div
                onClick={() => copyToClipboard(makeShortenedLink(path))}
                role="button"
                className="badge badge-neutral cursor-pointer"
              >
                Copy <Icon type="copy" className="w-4 h-4 pl-1" />
              </div>
            </h2>
            <p className="text-ellipsis  overflow-hidden sm:max-w-[450px] whitespace-nowrap">
              {url}
            </p>
            <div className="card-actions justify-between flex-row items-center">
              <div>
                <Button
                  onClick={async () => {
                    await softDeleteLinkAction(id);
                    setLinks((oldLinks) => oldLinks.filter(({ id: oldId }) => oldId !== id));
                  }}
                  variant="sm"
                  type="button"
                  className="btn-primary"
                >
                  Remove
                </Button>
              </div>
              <div>
                <div className="stat">
                  <div className="stat-title">Total Page Hits</div>
                  <div className="stat-value text-4xl">{totalHitCount}</div>
                  {totalHitCount && (
                    <div className="stat-desc">
                      {((hitRecords[0].hitCount * 100) / totalHitCount).toFixed(0)}% of them in last
                      day
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinksList;
