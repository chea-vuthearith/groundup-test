import { Triangle } from "lucide-react";
import AlertCard from "../alert-card";
import Badge from "../badge";

const Sidebar = () => {
  return (
    <div className="h-full min-w-80 rounded-md border border-gray-500 border-b-0 border-l-0">
      {/* action bar */}
      <div className="w-full px-10 py-4">
        <button
          type="button"
          className="flex items-center justify-center gap-x-4"
        >
          <Triangle className="-rotate-90 h-3 fill-black" />
          Back
        </button>
      </div>

      {/* numeric info */}
      <div className="flex w-full gap-x-3 rounded-md border-gray-500 border-t px-4 py-2">
        <p>6 alerts</p>{" "}
        <Badge bgColor="var(--primary)" color="#FFF">
          2 new
        </Badge>
      </div>

      {/* alert card container */}
      <div className="w-full rounded-md border-gray-500 border-t p-4">
        <AlertCard
          hasBeenRead={true}
          anomalyId={88813211}
          timestamp="1394104654000"
          machineName="CNC"
          anomalyLevel="mild"
          suspectedReason={"blank"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
