import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

const client = new Client({
  connectionString:
    '',
});

(async () => {
  await client.connect();
})().catch(console.error);

export const db = drizzle(client, { schema });
