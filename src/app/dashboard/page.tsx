import type { NextPage } from 'next';
import { Suspense } from 'react';

import { Button, Heading } from '@/components';
import { getCurrentUserOrRedirect } from '@/lib/server';
import { logoutUserAction } from '@/lib/server/actions';

import { LinksSection } from './_components';

const Dashboard: NextPage = async () => {
  const currentUser = await getCurrentUserOrRedirect();

  return (
    <div className="pt-24 md:pt-36 pb-8 w-full px-3 m-auto bg-transparent max-w-lg">
      <Heading text="Dashboard" />

      <div className="flex justify-center gap-2 items-center text-sm">
        <p className="py-4 text-center italic">Currently logged in as {currentUser?.email}</p>

        <form action={logoutUserAction}>
          <Button variant="xs" type="submit" className="btn-primary">
            Logout
          </Button>
        </form>
      </div>

      <p className="pb-6 pt-4 text-center">
        Your place for managing your shortened links and checking statistics.
      </p>

      <Suspense
        fallback={
          <div className="flex justify-center">
            <span className="m-auto loading loading-ring loading-lg" />
          </div>
        }
      >
        <LinksSection />
      </Suspense>
    </div>
  );
};

export default Dashboard;
