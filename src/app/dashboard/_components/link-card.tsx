'use client';

import { Button, Icon } from '@/components';
import { copyToClipboard, makeShortenedLink } from '@/lib';
import type { LinkWithStats } from '@/lib/server/get-current-user-links';

import LinkCardStats from './link-card-stats';
import LinkRemoveButton from './link-remove-button';

type Props = {
  link: LinkWithStats;
  onRemove: () => any;
};

const LinkCard: React.FC<Props> = ({ link: { id, path, url, ...stats }, onRemove }) => (
  <div className="card card-compact bg-base-100 shadow-md flex-col sm:flex-row justify-between">
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
      <p className="text-ellipsis  overflow-hidden sm:max-w-[450px] whitespace-nowrap">{url}</p>
      <div className="card-actions justify-between flex-row items-center">
        <div>
          <LinkRemoveButton onRemove={onRemove} path={path} />
        </div>
        <LinkCardStats stats={stats} />
      </div>
    </div>
  </div>
);

export default LinkCard;
