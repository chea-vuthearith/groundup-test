import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { soundClips } from "./sound-clips-schema";

export const suspectedReasonEnum = pgEnum("suspected_reason", [
  "Unknown Anomaly",
  "Restart Machine",
  "Replace Component",
  "Perform Software Update",
]);
export const actionRequiredEnum = pgEnum("action_required", [
  "Mechanical Issue",
  "Electrical Failure",
  "Software Crash",
]);
export const anomalyLevelEnum = pgEnum("anomaly_level", [
  "mild",
  "moderate",
  "severe",
]);

export const anomalies = pgTable("anomalies", {
  id: integer("id").generatedByDefaultAsIdentity().primaryKey().notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  hasBeenRead: boolean("read_status").default(false).notNull(),
  anomalyLevel: anomalyLevelEnum("anomaly_level").notNull(),
  sensor: varchar("sensor", { length: 255 }).notNull(),
  soundClipId: integer("sound_clip_id")
    .references(() => soundClips.id, {
      onDelete: "cascade",
    })
    .notNull()
    .unique(), // assuming a 1-1 relationship
  suspectedReason: suspectedReasonEnum("suspected_reason"),
  actionRequired: actionRequiredEnum("action_required"),
  comments: text("comments"),
});

export const alertsRelations = relations(anomalies, ({ one, many }) => ({
  soundClip: one(soundClips, {
    fields: [anomalies.soundClipId],
    references: [soundClips.id],
  }),
}));
