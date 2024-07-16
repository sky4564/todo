import { pgTable, text } from "drizzle-orm/pg-core";


export const work = pgTable('work', {
    commander: text('commander').primaryKey(),
    work: text('todo').notNull(),
});

