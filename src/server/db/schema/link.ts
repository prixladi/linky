import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { user } from './user';

export const link = pgTable('links', {
  id: serial('id').primaryKey(),
  url: varchar('url').notNull(),
  path: varchar('path').notNull().unique(),
  deleted: boolean('deleted').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  user: integer('user_id').references(() => user.id),
});
