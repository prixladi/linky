import type { NextPage } from 'next';

import { Heading } from '@/components';

import { FormSection } from './_components';

const Home: NextPage = () => (
  <main className="pt-24 md:pt-36 w-full px-3 m-auto bg-transparent max-w-lg">
    <Heading text="Linky" />

    <p className="py-6 text-center">
      Simple url shortener service with statistics for authenticated users.
    </p>
    
    <FormSection />
  </main>
);

export default Home;
