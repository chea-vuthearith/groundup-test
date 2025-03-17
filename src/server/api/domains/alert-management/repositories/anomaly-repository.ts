import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService, DrizzleTransactionScope } from "~/server/db";
import { anomalies } from "~/server/db/schema";
import { Anomaly } from "../models/anomaly";

export class AnomalyRepository {
  constructor(private readonly dbService: DbService) {}

  public async findOneById(id: number) {
    try {
      const result = await this.dbService
        .getQueryClient()
        .select()
        .from(anomalies)
        .where(eq(anomalies.id, id));

      if (!result[0]) return null;
      return new Anomaly(result[0]);
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  public async update(entity: Anomaly, tx?: DrizzleTransactionScope) {
    try {
      await this.dbService
        .getQueryClient(tx)
        .update(anomalies)
        .set(entity.getValue());
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}
