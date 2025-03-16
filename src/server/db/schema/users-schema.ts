import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { accounts } from "./accounts-schema";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  name: text("name").unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
