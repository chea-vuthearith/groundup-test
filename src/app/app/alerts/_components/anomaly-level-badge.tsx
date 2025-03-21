import { capitalize } from "~/utils/common";
import type { AlertSummary } from "../types";
import Badge from "./badge";

type Props = { severity: AlertSummary["anomalyLevel"] };
const severityColor: Record<Props["severity"], Record<string, string>> = {
  mild: { bgColor: "#FCA034", color: "#FFFFFF" },
  moderate: { bgColor: "#F86C39", color: "#FFFFFF" },
  severe: { bgColor: "hsl(var(--destructive))", color: "#FFFFFF" },
};
const AnomalyLevelBadge = (props: Props) => {
  const { bgColor, color } = severityColor[props.severity];

  return (
    <Badge bgColor={bgColor} color={color}>
      {capitalize(props.severity)}
    </Badge>
  );
};

export default AnomalyLevelBadge;
