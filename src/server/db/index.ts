import { sql } from "@vercel/postgres";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type {
  PostgresJsDatabase,
  PostgresJsQueryResultHKT,
} from "drizzle-orm/postgres-js";
import { drizzle as pgDrizzle } from "drizzle-orm/postgres-js";
import {
  type VercelPgDatabase,
  drizzle as vercelDrizzle,
} from "drizzle-orm/vercel-postgres";
import postgres from "postgres";
import * as schema from "./schema";

type Schema = typeof schema;

export type DrizzleTransactionScope = PgTransaction<
  PostgresJsQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;
interface DatabaseStrategy {
  getQueryClient(
    tx?: DrizzleTransactionScope,
  ):
    | DrizzleTransactionScope
    | PostgresJsDatabase<Schema>
    | VercelPgDatabase<Schema>;
}

class PostgreSQLJSDatabaseStrategy implements DatabaseStrategy {
  private connectionUrl: string;
  private queryClient: PostgresJsDatabase<Schema> | null;

  constructor(connectionUrl: string) {
    this.connectionUrl = connectionUrl;
    this.queryClient = null;
  }

  public getQueryClient(tx?: DrizzleTransactionScope) {
    if (tx) return tx;

    if (!this.queryClient) {
      const queryConnection = postgres(this.connectionUrl);
      this.queryClient = pgDrizzle(queryConnection, { schema });
    }

    return this.queryClient;
  }
}

class VercelPostgresDatabaseStrategy implements DatabaseStrategy {
  private queryClient: VercelPgDatabase<Schema> | null;
  constructor() {
    this.queryClient = null;
  }

  public getQueryClient(tx?: DrizzleTransactionScope) {
    if (tx) return tx;
    if (!this.queryClient) this.queryClient = vercelDrizzle(sql, { schema });
    return this.queryClient;
  }
}

export class DbService {
  constructor(private strategy: DatabaseStrategy) {}
  public getQueryClient(tx?: DrizzleTransactionScope) {
    return this.strategy.getQueryClient(tx);
  }
}
export const dbService = new DbService(new VercelPostgresDatabaseStrategy());
