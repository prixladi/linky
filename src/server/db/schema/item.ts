import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { user } from './user';

export const item = pgTable('items', {
  id: serial('id').primaryKey(),
  url: varchar('url').notNull(),
  path: varchar('path').notNull().unique(),
  user: integer('user_id').references(() => user.id),
});
