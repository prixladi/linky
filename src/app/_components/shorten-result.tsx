'use client';

import { Icon } from '@/components';
import { copyToClipboard } from '@/lib';

type Props = { link?: string };

export const ShortenResult: React.FC<Props> = ({ link }) =>
  link && (
    <div
      role="button"
      aria-hidden="true"
      onClick={() => {
        if (link) copyToClipboard(link);
      }}
      className="animateShow flex gap-2 mt-8 sm:mt-4 bg-neutral text-neutral-content px-8 py-2 items-center justify-between rounded-xl cursor-pointer"
    >
      <span className="truncate text-md">{link}</span>
      <Icon
        type="copy"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        height="1.2em"
        width="1.2em"
      />
    </div>
  );
