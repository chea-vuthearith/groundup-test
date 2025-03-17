import { eq } from "drizzle-orm";
import type { DbService, DrizzleTransactionScope } from "~/server/db";
import { soundClips } from "~/server/db/schema";
import { ErrorBoundary } from "~/utils/error-handling";
import type { SoundClip } from "../models/sound-clip";

export class SoundClipRepository {
  constructor(private readonly dbService: DbService) {}

  @ErrorBoundary()
  public async update(entity: SoundClip, tx?: DrizzleTransactionScope) {
    this.dbService
      .getQueryClient(tx)
      .update(soundClips)
      .set(entity.getValue())
      .where(eq(soundClips.id, entity.getValue().id));
  }
}
