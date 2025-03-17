ALTER TABLE "anomaly" RENAME TO "anomalies";--> statement-breakpoint
ALTER TABLE "anomalies" DROP CONSTRAINT "anomaly_sound_clip_id_unique";--> statement-breakpoint
ALTER TABLE "anomalies" DROP CONSTRAINT "anomaly_sound_clip_id_sound_clips_id_fk";
--> statement-breakpoint
ALTER TABLE "anomalies" ADD CONSTRAINT "anomalies_sound_clip_id_sound_clips_id_fk" FOREIGN KEY ("sound_clip_id") REFERENCES "public"."sound_clips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anomalies" ADD CONSTRAINT "anomalies_sound_clip_id_unique" UNIQUE("sound_clip_id");