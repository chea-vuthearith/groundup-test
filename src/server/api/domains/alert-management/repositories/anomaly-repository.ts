import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService, DrizzleTransactionScope } from "~/server/db";
import { anomalies } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import { Anomaly } from "../models/anomaly";

export class AnomalyRepository {
  constructor(private readonly dbService: DbService) {}

  @ErrorBoundary()
  public async findOneById(id: number) {
    const result = await this.dbService
      .getQueryClient()
      .select()
      .from(anomalies)
      .where(eq(anomalies.id, id));

    if (result[0]) return new Anomaly(result[0]);

    throw new TRPCError({
      message: "Anomaly not found",
      code: "NOT_FOUND",
    });
  }

  @ErrorBoundary()
  public async update(entity: Anomaly, tx?: DrizzleTransactionScope) {
    await this.dbService
      .getQueryClient(tx)
      .update(anomalies)
      .set(entity.getValue());
  }
}
