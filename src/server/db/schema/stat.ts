import { index, integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core';

import { link } from './link';

export const stat = pgTable(
  'stats',
  {
    date: timestamp('date', { mode: 'date' }).notNull(),
    linkId: integer('link_id')
      .references(() => link.id)
      .notNull(),
    hitCount: integer('hit_count').default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.date, table.linkId] }),
    linkIdIdx: index('link_id_idx').on(table.linkId),
    dateIdx: index('date_idx').on(table.date),
  }),
);
