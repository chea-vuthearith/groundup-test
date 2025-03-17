import { Triangle } from "lucide-react";
import { cn } from "~/lib/utils";
import AlertCard from "../alert-card";
import Badge from "../badge";

const Sidebar = () => {
  return (
    <div className={cn("h-full min-w-80 rounded-md border-r")}>
      {/* action bar */}
      <div className={cn("w-full px-10 py-4")}>
        <button
          type="button"
          className={cn("flex items-center justify-center gap-x-4")}
        >
          <Triangle className={cn("-rotate-90 h-3 fill-black")} />
          Back
        </button>
      </div>

      {/* numeric info */}
      <div className={cn("flex w-full gap-x-3 rounded-md border-t px-4 py-2")}>
        <p>6 alerts</p>{" "}
        <Badge bgColor="var(--primary)" color="#FFF">
          2 new
        </Badge>
      </div>

      {/* alert card container */}
      <div className={cn("w-full rounded-md border-t p-4")}>
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
