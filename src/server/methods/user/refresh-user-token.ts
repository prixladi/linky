import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { generateAccessToken, verifyRefreshToken } from '@/server/utils/jwt';
import type { BadRequest} from '@/server/utils/status-errors';
import { makeBadRequest } from '@/server/utils/status-errors';

type Data = {
  refreshToken: string;
};

type Result =
  | {
      accessToken: string;
      accessTokenExpirationS: number;
    }
  | BadRequest;

const refreshUserToken = async ({ refreshToken }: Data): Promise<Result> => {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) return makeBadRequest();

  const [existingUser] = await db.select().from(user).where(eq(user.id, payload.id)).limit(1);

  if (!existingUser) {
    return makeBadRequest();
  }

  if (!existingUser.active) {
    return makeBadRequest();
  }

  const accessTokenResult = await generateAccessToken(payload);

  return {
    accessToken: accessTokenResult.token,
    accessTokenExpirationS: accessTokenResult.duration,
  };
};

export default refreshUserToken;
