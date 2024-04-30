'use client';

import type { LinkWithStats } from '@/lib/server/get-current-user-links';

type Props = {
  stats: Pick<LinkWithStats, 'totalHitCount' | 'hitRecords'>;
};

export const LinkCardStats: React.FC<Props> = ({ stats: { hitRecords, totalHitCount } }) => {
  const [lastDayRecord] = hitRecords;
  const lastDayPercentage =
    totalHitCount && lastDayRecord?.hitCount
      ? ((lastDayRecord.hitCount * 100) / totalHitCount).toFixed(0)
      : undefined;

  return (
    <div>
      <div className="stat">
        <div className="stat-title">Total Page Hits</div>
        <div className="stat-value text-4xl">{totalHitCount}</div>
        {lastDayPercentage && (
          <div className="stat-desc">{lastDayPercentage}% of them in last day</div>
        )}
      </div>
    </div>
  );
};
