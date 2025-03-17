import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { anomalies, machines, soundClips } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import { AlertSummary, AlertWithDetails } from "../models/alert";

export class AlertRepository {
  constructor(private readonly dbService: DbService) {}

  @ErrorBoundary()
  public async findAllSummaries() {
    const result = await this.dbService
      .getQueryClient()
      .select({
        anomalyId: anomalies.id,
        machineName: machines.name,
        timestamp: anomalies.timestamp,
        hasBeenRead: anomalies.hasBeenRead,
        anomalyLevel: anomalies.anomalyLevel,
        suspectedReason: anomalies.suspectedReason,
      })
      .from(anomalies)
      .innerJoin(soundClips, eq(soundClips.id, anomalies.soundClipId))
      .innerJoin(machines, eq(machines.id, soundClips.machineId))
      .orderBy(asc(anomalies.timestamp));

    const entities = result.map((r) => new AlertSummary(r));
    return entities;
  }

  @ErrorBoundary()
  public async findOneWithDetailsByAnomalyId(anomalyId: number) {
    const result = await this.dbService
      .getQueryClient()
      .select({
        anomaly: anomalies,
        soundClip: soundClips,
        machine: machines,
      })
      .from(anomalies)
      .innerJoin(soundClips, eq(soundClips.id, anomalies.soundClipId))
      .innerJoin(machines, eq(machines.id, soundClips.machineId))
      .where(eq(anomalies.id, anomalyId));
    console.log("got this far helloo");
    if (result[0]) return new AlertWithDetails(result[0]);

    throw new TRPCError({
      message: "Alert not found",
      code: "NOT_FOUND",
    });
  }
}
