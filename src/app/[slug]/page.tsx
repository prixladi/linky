import { getLinkByPath } from '@/server/methods/link';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { slug: string };
};

const Link: NextPage<Props> = async ({ params }) => {
  const { url } = await getLinkByPath(params.slug);
  redirect(url ?? '/');
};

export default Link;
