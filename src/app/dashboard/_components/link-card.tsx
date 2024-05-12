'use client';

import { Icon } from '@/components';
import { copyToClipboard, makeShortenedLink } from '@/lib';
import type { LinkWithStats } from '@/lib/server/get-current-user-links';

import { LinkCardStats } from './link-card-stats';
import { LinkRemoveButton } from './link-remove-button';

type Props = {
  link: LinkWithStats;
  onRemove: () => any;
};

export const LinkCard: React.FC<Props> = ({ link: { id, path, url, ...stats }, onRemove }) => (
  <div className="card card-compact flex-col justify-between bg-base-100 shadow-md sm:flex-row">
    <div className="card-body gap-1">
      <h2 className="text-md card-title mb-0">
        <div
          onClick={() => copyToClipboard(makeShortenedLink(path))}
          role="button"
          tabIndex={0}
          className="badge badge-neutral  cursor-pointer"
        >
          /{path}
        </div>
        <div
          onClick={() => copyToClipboard(makeShortenedLink(path))}
          role="button"
          tabIndex={0}
          className="badge badge-neutral cursor-pointer"
        >
          Copy <Icon type="copy" className="h-4 w-4 pl-1" />
        </div>
      </h2>
      <p className="overflow-hidden  text-ellipsis whitespace-nowrap sm:max-w-[450px]">{url}</p>
      <div className="card-actions flex-row items-center justify-between">
        <div>
          <LinkRemoveButton onRemove={onRemove} path={path} />
        </div>
        <LinkCardStats stats={stats} />
      </div>
    </div>
  </div>
);
