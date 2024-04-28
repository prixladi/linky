import type { NextPage } from 'next';

import { Heading } from '@/components';
import { getCurrentUserLinks } from '@/lib/server';

const Dashboard: NextPage = async () => {
  const links = await getCurrentUserLinks();

  return (
    <div className="pt-24 md:pt-36 w-full px-3 m-auto bg-transparent max-w-lg">
      <Heading text="Dashboard" />
      {links.map((x) => (
        <div key={x.id}>{x.path}</div>
      ))}
      {/* <button type="submit" className="btn" onClick={() => logoutUserAction()}>
        Logout
      </button> */}
    </div>
  );
};

export default Dashboard;
