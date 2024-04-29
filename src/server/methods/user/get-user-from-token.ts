import { verifyAccessToken } from '@/server/utils/jwt';
import type { BadRequest} from '@/server/utils/status-errors';
import { makeBadRequest } from '@/server/utils/status-errors';

type Data = {
  accessToken: string;
};

type Result =
  | {
      id: number;
      email: string;
    }
  | BadRequest;

const getUserFromToken = async ({ accessToken }: Data): Promise<Result> => {
  const payload = await verifyAccessToken(accessToken);
  if (!payload) return makeBadRequest();

  return {
    id: payload.id,
    email: payload.email,
  };
};

export default getUserFromToken;
