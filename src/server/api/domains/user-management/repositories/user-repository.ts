import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { users } from "~/server/db/schema";
import { User } from "../models/user-model";

export class UserRepository {
  constructor(private readonly dbService: DbService) {}
  public async findOneOrNullByUsername(username: string) {
    try {
      const results = await this.dbService
        .getQueryClient()
        .select()
        .from(users)
        .where(eq(users.name, username));

      return results[0]
        ? new User({
            ...results[0],
          })
        : null;
    } catch (e) {
      const error = e as Error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}
