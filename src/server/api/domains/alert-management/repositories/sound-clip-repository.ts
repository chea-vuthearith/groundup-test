import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { DbService, DrizzleTransactionScope } from "~/server/db";
import { soundClips } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import { SoundClip, type SoundClipProps } from "../models/sound-clip";

export class SoundClipRepository {
  constructor(private readonly dbService: DbService) {}

  @ErrorBoundary()
  public async findOneById(id: SoundClipProps["id"]) {
    const result = await this.dbService
      .getQueryClient()
      .select()
      .from(soundClips)
      .where(eq(soundClips.id, id));
    if (result[0]) return new SoundClip(result[0]);

    throw new TRPCError({ message: "Sound clip not found", code: "NOT_FOUND" });
  }

  @ErrorBoundary()
  public async update(entity: SoundClip, tx?: DrizzleTransactionScope) {
    this.dbService
      .getQueryClient(tx)
      .update(soundClips)
      .set(entity.getValue())
      .where(eq(soundClips.id, entity.getValue().id));
  }
}
