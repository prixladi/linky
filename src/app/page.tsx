import { NextPage } from 'next';

import { FormSection } from './_components';

const Home: NextPage = () => (
  <main className='max-w-xl pt-20 md:pt-32 px-6 m-auto'>
    <div className='hero'>
      <div className='hero-content text-center'>
        <div>
          <h1 className='text-5xl font-bold'>Linky</h1>
          <p className='py-6'>
            Simple url shortener service with statistics for authenticated
            users.
          </p>
          <FormSection />
        </div>
      </div>
    </div>
  </main>
);

export default Home;
