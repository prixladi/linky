'use server';

import { shortenUrl } from '@/server/methods/link';

const shortenLink = async (url: string) => shortenUrl(url);

export default shortenLink;
