'use client';

import logoutAction from '@/actions/logout-action';
import { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <div className='pt-36 pl-36'>
      <button className='btn' onClick={() => logoutAction()}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
