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
      className="animateShow mt-8 flex cursor-pointer items-center justify-between gap-2 rounded-xl bg-neutral px-8 py-2 text-neutral-content sm:mt-4"
    >
      <span className="text-md truncate">{link}</span>
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
