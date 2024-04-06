'use server';

import { shortenLink } from '@/server/methods';

type Shortened = {
  path: string;
  id: number;
};

const shortenLinkAction = async (url: string): Promise<Shortened> => {
  const link = await shortenLink(url);

  return {
    id: link.id,
    path: link.path,
  };
};

export default shortenLinkAction;
