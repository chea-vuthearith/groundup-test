ALTER TABLE "alerts" RENAME TO "anomaly";--> statement-breakpoint
ALTER TABLE "anomaly" DROP CONSTRAINT "alerts_sound_clip_id_unique";--> statement-breakpoint
ALTER TABLE "anomaly" DROP CONSTRAINT "alerts_machine_id_machines_id_fk";
--> statement-breakpoint
ALTER TABLE "anomaly" DROP CONSTRAINT "alerts_sound_clip_id_sound_clips_id_fk";
--> statement-breakpoint
ALTER TABLE "anomaly" ALTER COLUMN "timestamp" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sound_clips" ALTER COLUMN "waveform" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sound_clips" ALTER COLUMN "spectogram" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "anomaly" ADD COLUMN "read_status" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sound_clips" ADD COLUMN "machine_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anomaly" ADD CONSTRAINT "anomaly_sound_clip_id_sound_clips_id_fk" FOREIGN KEY ("sound_clip_id") REFERENCES "public"."sound_clips"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sound_clips" ADD CONSTRAINT "sound_clips_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "anomaly" DROP COLUMN IF EXISTS "machine_id";--> statement-breakpoint
ALTER TABLE "anomaly" ADD CONSTRAINT "anomaly_sound_clip_id_unique" UNIQUE("sound_clip_id");