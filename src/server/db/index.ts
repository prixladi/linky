import { VercelClient } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import config from '@/server-config';

import * as schema from './schema';

const client = new VercelClient({
  connectionString: config.dbConnectionString,
});

(async () => {
  await client.connect();
})().catch(console.error);

export const db = drizzle(client, { schema });
