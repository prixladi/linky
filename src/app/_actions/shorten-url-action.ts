'use server';

import { shortenUrl } from '@/server/methods/link';

const shortenUrlAction = async (url: string) => shortenUrl(url);

export default shortenUrlAction;
