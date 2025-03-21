import { TRPCError } from "@trpc/server";
import { asc, desc, eq, sql } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { anomalies, machines, soundClips } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import { AlertSummary, AlertWithDetails } from "../models/alert";
import type { AnomalyProps } from "../models/anomaly";

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
      .orderBy(
        desc(sql`CASE WHEN ${anomalies.hasBeenRead} = false THEN 1 ELSE 0 END`),
        asc(anomalies.id),
      );

    const entities = result.map((r) => new AlertSummary(r));
    return entities;
  }

  @ErrorBoundary()
  public async findOneWithDetailsByAnomalyId(anomalyId: AnomalyProps["id"]) {
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
    if (result[0]) return new AlertWithDetails(result[0]);

    throw new TRPCError({
      message: "Alert not found",
      code: "NOT_FOUND",
    });
  }
}
