import type { AnomalyProps } from "./anomaly";
import type { MachineProps } from "./machine";
import type { SoundClipProps } from "./sound-clip";

export type AlertWithDetailsProps = {
  anomaly: AnomalyProps;
  machine: MachineProps;
  soundClip: SoundClipProps;
};

export class AlertWithDetails {
  constructor(private readonly props: AlertWithDetailsProps) {}

  public getValue() {
    return this.props;
  }
}
export type AlertSummaryProps = {
  anomalyId: AnomalyProps["id"];
  anomalyLevel: AnomalyProps["anomalyLevel"];
  suspectedReason: AnomalyProps["suspectedReason"];
  timestamp: AnomalyProps["timestamp"];
  machineName: MachineProps["name"];
  hasBeenRead: AnomalyProps["hasBeenRead"];
};

export class AlertSummary {
  constructor(private readonly props: AlertSummaryProps) {}

  public getValue() {
    return this.props;
  }
}
