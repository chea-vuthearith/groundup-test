import type { RouterOutputs } from "~/trpc/react";

export type AlertDetails = RouterOutputs["alerts"]["getAlertDetails"];
export type AlertSummary =
  RouterOutputs["alerts"]["getAllAlertSummaries"][number];
