'use server';

import { shortenUrl } from '@/server/methods';

const shortenLink = async (url: string) => shortenUrl(url);

export default shortenLink;
