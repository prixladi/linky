import type { Metadata, NextPage } from 'next';

import { PageContainer } from '@/components';

import { FormSection } from './_components';

export const metadata: Metadata = {
  title: 'Linky | URL shortener',
};

const Home: NextPage = () => (
  <PageContainer heading="Linky">
    <p className="py-6 text-center">
      Simple url shortener service with statistics for authenticated users.
    </p>

    <FormSection />
  </PageContainer>
);

export default Home;
