import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { soundClips } from "./sound-clips-schema";

export const suspectedReasonEnum = pgEnum("suspected_reason", ["blank"]);
export const actionRequiredEnum = pgEnum("action_required", ["blank"]);
export const anomalyLevelEnum = pgEnum("anomaly_level", [
  "mild",
  "moderate",
  "severe",
]);

export const anomalies = pgTable("anomaly", {
  id: integer("id").generatedByDefaultAsIdentity().primaryKey().notNull(),
  timestamp: date("timestamp").defaultNow().notNull(),
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
