import type { AlertSummary } from "../types";
import AnomalyLevelBadge from "./anomaly-level-badge";

// TODO: put the summary in data prop
interface Props extends AlertSummary {
  selected?: boolean;
}
const AlertCard = (props: Props) => {
  return (
    <div
      className={`flex w-full flex-col justify-center gap-3 rounded-md border py-2 pr-3 pl-7 text-gray-600 text-sm ${props.selected ? "border-primary" : "border-gray-500"}`}
    >
      <div className="relative flex items-center justify-between ">
        {!props.hasBeenRead && (
          <div className="-left-4 absolute size-3 rounded-full bg-primary" />
        )}
        <p className="">ID #{props.anomalyId}</p>
        <AnomalyLevelBadge severity={props.anomalyLevel} />
      </div>

      <div>
        <p className="font-bold">{props.suspectedReason}</p>
        <p className=""> Detected at {new Date(props.timestamp).toString()}</p>
      </div>

      <p className="text-primary">{props.machineName}</p>
    </div>
  );
};

export default AlertCard;
