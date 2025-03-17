import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { users } from "~/server/db/schema";
import { User } from "../models/user";

export class UserRepository {
  constructor(private readonly dbService: DbService) {}
  public async findOneOrNullByUsername(username: string) {
    try {
      const result = await this.dbService
        .getQueryClient()
        .query.users.findFirst({ where: eq(users.name, username) });

      if (result) return new User(result);

      return null;
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}
