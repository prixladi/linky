import { boolean, index, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { user } from './user';

export const link = pgTable(
  'links',
  {
    id: serial('id').primaryKey(),
    url: varchar('url').notNull(),
    path: varchar('path').notNull().unique(),
    deleted: boolean('deleted').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
    userId: integer('user_id').references(() => user.id),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
  }),
);
