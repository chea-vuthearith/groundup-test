import { z } from "zod";
export const getAlertDetailsValidator = z.object({
  anomalyId: z.number(),
});
