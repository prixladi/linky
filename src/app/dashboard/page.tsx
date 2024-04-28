'use client';

import type { NextPage } from 'next';

import logoutAction from '@/actions/logout-action';

const Dashboard: NextPage = () => (
  <div className="pt-36 pl-36">
    <button type="submit" className="btn" onClick={() => logoutAction()}>
      Logout
    </button>
  </div>
);

export default Dashboard;
