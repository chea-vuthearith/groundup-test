import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { actionRequiredEnum, suspectedReasonEnum } from "~/server/db/schema";
export const getAlertDetailsValidator = z.object({
  anomalyId: z.number(),
});

export const patchAlertDetailsValidator = z.object({
  anomalyId: z.number(),
  comments: z.string().nullish(),
  actionRequired: createSelectSchema(actionRequiredEnum).nullish(),
  suspectedReason: createSelectSchema(suspectedReasonEnum).nullish(),
});
