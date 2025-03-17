import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { anomalies, machines, soundClips } from "~/server/db/schema";
import { AlertSummary, AlertWithDetails } from "../models/alert";

export class AlertRepository {
  constructor(private readonly dbService: DbService) {}
  public async findAllSummaries() {
    try {
      const result = await this.dbService
        .getQueryClient()
        .select({
          anomalyId: anomalies.id,
          anomalyLevel: anomalies.anomalyLevel,
          suspectedReason: anomalies.suspectedReason,
          timestamp: anomalies.timestamp,
          machineName: machines.name,
        })
        .from(anomalies)
        .innerJoin(soundClips, eq(soundClips.id, anomalies.soundClipId))
        .innerJoin(machines, eq(machines.id, soundClips.machineId));

      const entities = result.map((r) => new AlertSummary(r));
      return entities;
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
  public async findOneWithDetailsByAnomalyId(anomalyId: number) {
    try {
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
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}
