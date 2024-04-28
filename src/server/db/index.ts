import { VercelClient } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import * as schema from './schema';

const client = new VercelClient({
  connectionString:
    'postgres://default:kioTASRjX78m@ep-bitter-hill-a2zytdwe.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

(async () => {
  await client.connect();
})().catch(console.error);

export const db = drizzle(client, { schema });
