import { capitalize } from "~/utils/common";
import type { AlertSummary } from "../types";

type Props = { severity: AlertSummary["anomalyLevel"] };
const severityColor: Record<Props["severity"], string> = {
  mild: "#FCA034",
  moderate: "#FCA034",
  severe: "#FCA034",
};
const AnomalyLevelBadge = (props: Props) => {
  return (
    <p
      className="min-w-16 rounded-full px-2 py-[1px] text-center text-sm"
      style={{ backgroundColor: severityColor[props.severity] }}
    >
      {capitalize(props.severity)}
    </p>
  );
};

export default AnomalyLevelBadge;
