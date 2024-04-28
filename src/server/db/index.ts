import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from './schema';

const client = new Client({
  connectionString:
    'postgres://default:kioTASRjX78m@ep-bitter-hill-a2zytdwe.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

(async () => {
  await client.connect();
})().catch(console.error);

export const db = drizzle(client, { schema });
