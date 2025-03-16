import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { alerts } from "./alerts-schema";

export const machines = pgTable("machines", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
export const machinesRelations = relations(machines, ({ one, many }) => ({
  alerts: many(alerts),
}));
