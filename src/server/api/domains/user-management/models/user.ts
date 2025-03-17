import type { InferSelectModel } from "drizzle-orm";
import type { users } from "~/server/db/schema";

export type UserProps = InferSelectModel<typeof users>;

export class User {
  constructor(private readonly props: UserProps) {}

  public getValue() {
    return this.props;
  }
}
