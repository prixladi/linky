import type { NextPage } from 'next';
import { Suspense } from 'react';

import { Heading } from '@/components';

import { LinksSection } from './_components';

const Dashboard: NextPage = async () => (
  <div className="pt-24 md:pt-36 pb-8 w-full px-3 m-auto bg-transparent max-w-lg">
    <Heading text="Dashboard" />
    <p className="py-6 text-center">
      Your place for managing your shortened links and checking statistics.
    </p>

    <Suspense>
      <LinksSection />
    </Suspense>
    {/* <button type="submit" className="btn" onClick={() => logoutUserAction()}>
        Logout
      </button> */}
  </div>
);

export default Dashboard;
