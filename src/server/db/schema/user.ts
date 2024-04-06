import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('name').notNull(),
  passwordHash: varchar('password_hash'),
});
