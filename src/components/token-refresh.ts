'use client';

import { useEffect, useRef } from 'react';

import { wait } from '@/lib';
import { refreshUserTokenIfNeededAction } from '@/lib/server/actions';

const TokenRefresh: React.FC = () => {
  const running = useRef(false);

  useEffect(() => {
    const refreshLoop = async () => {
      while (running.current) {
        const { nextCheckInS } = await refreshUserTokenIfNeededAction(); // eslint-disable-line no-await-in-loop
        if (!nextCheckInS) break;
        await wait(nextCheckInS * 1000); // eslint-disable-line no-await-in-loop
      }
    };

    if (!running.current) {
      running.current = true;
      refreshLoop().catch(console.error);
    }

    return () => {
      running.current = false;
    };
  }, []);

  return null;
};

export default TokenRefresh;
