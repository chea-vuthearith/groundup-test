import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService } from "~/server/db";
import { users } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import { User, type UserProps } from "../models/user";

export class UserRepository {
  constructor(private readonly dbService: DbService) {}

  @ErrorBoundary()
  public async findOneByUsername(username: UserProps["name"]) {
    const result = await this.dbService
      .getQueryClient()
      .query.users.findFirst({ where: eq(users.name, username) });

    if (result) return new User(result);

    throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });
  }
}
