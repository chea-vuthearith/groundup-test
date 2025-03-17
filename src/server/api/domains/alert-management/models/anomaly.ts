import type { InferSelectModel } from "drizzle-orm";
import type { anomalies } from "~/server/db/schema";

export type AnomalyProps = InferSelectModel<typeof anomalies>;

export class Anomaly {
  constructor(private readonly props: AnomalyProps) {}

  public getValue() {
    return this.props;
  }
  public setReadStatus(status: boolean) {
    this.props.hasBeenRead = status;
    return this;
  }
  public setComment(comments: string) {
    this.props.comments = comments;
    return this;
  }
  public setActionRequired(action: AnomalyProps["actionRequired"]) {
    this.props.actionRequired = action;
    return this;
  }
  public setSuspectedReason(reason: AnomalyProps["suspectedReason"]) {
    this.props.suspectedReason = reason;
    return this;
  }
}
