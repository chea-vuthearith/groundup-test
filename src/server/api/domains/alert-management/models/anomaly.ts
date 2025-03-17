import type { InferSelectModel } from "drizzle-orm";
import type { anomalies } from "~/server/db/schema";

export type AnomalyProps = InferSelectModel<typeof anomalies>;

export class Anomaly {
  constructor(private readonly props: AnomalyProps) {}

  public getValue() {
    return this.props;
  }
  public setReadStatus(status: boolean) {
    this.props.readStatus = status;
    return this;
  }
}
