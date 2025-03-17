import type { InferSelectModel } from "drizzle-orm";
import type { machines } from "~/server/db/schema";

export type MachineProps = InferSelectModel<typeof machines>;

export class Machine {
  constructor(private readonly props: MachineProps) {}

  public getValue() {
    return this.props;
  }
}
