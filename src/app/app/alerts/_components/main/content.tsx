import { cn } from "~/lib/utils";
import SoundCharts from "../sound-charts";

const Content = () => {
  return (
    <div className={cn("flex grow flex-col overflow-auto px-9 py-4")}>
      <h1>Alert ID #{"skdfjasdf"}</h1>
      <span>Detected at TIME</span>
      {/* charts */}
      <div className="flex w-full">
        <div className="flex w-full gap-x-14">
          <SoundCharts title="Anomaly Machine Output" />
          <SoundCharts title="Normal Machine Output" />
        </div>
      </div>
    </div>
  );
};

export default Content;
