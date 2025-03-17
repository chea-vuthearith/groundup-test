ALTER TABLE "public"."anomaly" ALTER COLUMN "action_required" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."action_required";--> statement-breakpoint
CREATE TYPE "public"."action_required" AS ENUM('Mechanical Issue', 'Electrical Failure', 'Software Crash');--> statement-breakpoint
ALTER TABLE "public"."anomaly" ALTER COLUMN "action_required" SET DATA TYPE "public"."action_required" USING "action_required"::"public"."action_required";--> statement-breakpoint
ALTER TABLE "public"."anomaly" ALTER COLUMN "suspected_reason" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."suspected_reason";--> statement-breakpoint
CREATE TYPE "public"."suspected_reason" AS ENUM('Unknown Anomaly', 'Restart Machine', 'Replace Component', 'Perform Software Update');--> statement-breakpoint
ALTER TABLE "public"."anomaly" ALTER COLUMN "suspected_reason" SET DATA TYPE "public"."suspected_reason" USING "suspected_reason"::"public"."suspected_reason";