import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('name').notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  active: boolean('active').notNull(),
  passwordHash: varchar('password_hash').notNull(),
});
