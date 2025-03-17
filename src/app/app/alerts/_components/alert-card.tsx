import { cn } from "~/lib/utils";
import { useAlertStore } from "../hooks/use-alert-store";
import type { AlertSummary } from "../types";
import AnomalyLevelBadge from "./anomaly-level-badge";

// TODO: put the summary in data prop
interface Props {
  isSelected?: boolean;
  data: AlertSummary;
}
const AlertCard = (props: Props) => {
  const { setSelectedAnomalyId } = useAlertStore();
  return (
    <div
      onClick={() => setSelectedAnomalyId(props.data.anomalyId)}
      className={cn(
        "flex w-full cursor-pointer flex-col justify-center gap-3 rounded-md border-2 border-gray-300 py-2 pr-3 pl-7 text-gray-600",
        props.isSelected && "border-primary",
      )}
    >
      <div className={cn("relative flex items-center justify-between ")}>
        {!props.data.hasBeenRead && (
          <div
            className={cn("-left-4 absolute size-3 rounded-full bg-primary")}
          />
        )}
        <p>ID #{props.data.anomalyId}</p>
        <AnomalyLevelBadge severity={props.data.anomalyLevel} />
      </div>

      <div>
        <p className={cn("font-bold")}>{props.data.suspectedReason}</p>
        <p className={cn("")}>
          {" "}
          Detected at {new Date(props.data.timestamp).toString()}
        </p>
      </div>

      <p className={cn("text-primary")}>{props.data.machineName}</p>
    </div>
  );
};

export default AlertCard;
