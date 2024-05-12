import type { NextPage } from 'next';
import { Suspense } from 'react';

import { Button, PageContainer } from '@/components';
import { getCurrentUserOrRedirect } from '@/lib/server';
import { logoutUserAction } from '@/lib/server/actions';

import { LinksSection } from './_components';

const Dashboard: NextPage = async () => {
  const currentUser = await getCurrentUserOrRedirect();

  return (
    <PageContainer heading="Dashboard">
      <div className="flex items-center justify-center gap-2 text-sm">
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
            <span className="loading loading-ring loading-lg m-auto" />
          </div>
        }
      >
        <LinksSection />
      </Suspense>
    </PageContainer>
  );
};

export default Dashboard;
