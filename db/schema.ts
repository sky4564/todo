import { pgTable, text } from "drizzle-orm/pg-core";


export const work = pgTable('work', {
    todo: text('todo').primaryKey(),
});

