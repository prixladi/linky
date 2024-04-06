import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      'postgres://default:kioTASRjX78m@ep-bitter-hill-a2zytdwe.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
  },
} satisfies Config;
