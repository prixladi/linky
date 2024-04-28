'use client';

import { wait } from '@/lib';
import { refreshUserTokenIfNeededAction } from '@/lib/server/actions';
import { useEffect, useRef } from 'react';

const TokenRefresh: React.FC = () => {
  const running = useRef(false);

  useEffect(() => {
    const refreshLoop = async () => {
      while (true) {
        const { nextCheckInS } = await refreshUserTokenIfNeededAction();
        if (!nextCheckInS) break;
        await wait(nextCheckInS * 1000);
      }
    };

    if (!running.current) {
      running.current = true;
      refreshLoop().catch(console.error);
    }
  }, []);

  return null;
};

export default TokenRefresh;
