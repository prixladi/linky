import type { NextPage } from 'next';

import { Button, Heading, Icon } from '@/components';
import { getCurrentUserLinks } from '@/lib/server';

const Dashboard: NextPage = async () => {
  const links = await getCurrentUserLinks();

  return (
    <div className="pt-24 md:pt-36 pb-8 w-full px-3 m-auto bg-transparent max-w-lg">
      <Heading text="Dashboard" />
      <p className="py-6 text-center">
        Your place for managing your shortened links and checking statistics.
      </p>

      <div className="flex gap-2 flex-col">
        {links.map(({ id, url, path, totalHitCount, hitRecords }) => (
          <div
            key={id}
            className="card card-compact bg-base-100 shadow-md flex-col sm:flex-row justify-between"
          >
            <div className="card-body gap-1">
              <h2 className="card-title text-md mb-0">
                <div className="badge badge-neutral">/{path}</div>
                <button className="badge badge-neutral">
                  Copy <Icon type="copy" className="w-4 h-4 pl-1" />
                </button>
              </h2>
              <p className="text-ellipsis  overflow-hidden sm:max-w-[450px] whitespace-nowrap">
                {url}
              </p>
              <div className="card-actions justify-between flex-row items-center">
                <div>
                  <Button variant="md" type="button" className="btn-primary">
                    Delete
                  </Button>
                </div>
                <div>
                  <div className="stat">
                    <div className="stat-title">Total Page Hits</div>
                    <div className="stat-value text-4xl">{totalHitCount}</div>
                    <div className="stat-desc">50% of them in last day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <button type="submit" className="btn" onClick={() => logoutUserAction()}>
        Logout
      </button> */}
    </div>
  );
};

export default Dashboard;
