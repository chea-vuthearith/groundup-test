import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { machines } from "./machines-schema";
import { soundClips } from "./sound-clips-schema";

const anomalyLevelEnum = pgEnum("anomaly_level", [
  "mild",
  "moderate",
  "severe",
]);
const suspectedReasonEnum = pgEnum("suspected_reason", ["blank"]);
const actionRequiredEnum = pgEnum("action_required", ["blank"]);

export const alerts = pgTable("alerts", {
  id: integer("id").generatedByDefaultAsIdentity().primaryKey().notNull(),
  timestamp: date("timestamp").defaultNow(),
  machineId: integer("machine_id")
    .references(() => machines.id, {
      onDelete: "cascade",
    })
    .notNull(),
  anomalyLevel: anomalyLevelEnum("anomaly_level").notNull(),
  sensor: varchar("sensor", { length: 255 }).notNull(),
  soundClipId: integer("sound_clip_id")
    .references(() => soundClips.id, {
      onDelete: "cascade",
    })
    .notNull()
    .unique(), // assuming a 1-1 relationship
  //TODO: fill this in
  suspectedReason: suspectedReasonEnum("suspected_reason"),
  actionRequired: actionRequiredEnum("action_required"),
  comments: text("comments"),
});

export const alertsRelations = relations(alerts, ({ one, many }) => ({
  machine: one(machines, {
    fields: [alerts.machineId],
    references: [machines.id],
  }),
  soundClip: one(soundClips, {
    fields: [alerts.soundClipId],
    references: [soundClips.id],
  }),
}));
