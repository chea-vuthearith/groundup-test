import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { anomalies } from "./anomalies-schema";
import { machines } from "./machines-schema";

export const soundClips = pgTable("sound_clips", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  machineId: integer("machine_id")
    .references(() => machines.id, {
      onDelete: "cascade",
    })
    .notNull(),
  url: text("url").notNull(),
  waveform: text("waveform"),
  spectrogram: text("spectogram"),
});

export const soundClipsRelations = relations(soundClips, ({ one, many }) => ({
  alert: one(anomalies, {
    fields: [soundClips.id],
    references: [anomalies.soundClipId],
  }),
  machine: one(machines, {
    fields: [soundClips.machineId],
    references: [machines.id],
  }),
}));
