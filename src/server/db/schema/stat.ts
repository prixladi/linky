import { date, integer, pgTable, serial } from 'drizzle-orm/pg-core';

export const stats = pgTable('stats', {
  id: serial('id').primaryKey(),
  date: date('name').notNull(),
  hitCount: integer('hit_count').default(0).notNull(),
});
