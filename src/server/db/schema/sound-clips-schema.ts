import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { alerts } from "./alerts-schema";

export const soundClips = pgTable("sound_clips", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  url: text("url").notNull(),
  waveform: text("waveform").notNull(),
  spectrogram: text("spectogram").notNull(),
});

export const soundClipsRelations = relations(soundClips, ({ one, many }) => ({
  alert: one(alerts, {
    fields: [soundClips.id],
    references: [alerts.soundClipId],
  }),
}));
