"use client";
import { Triangle } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useAlertStore } from "../../hooks/use-alert-store";
import AlertCard from "../alert-card";
import Badge from "../badge";

const Sidebar = () => {
  const [data, getAllAlertSummariesQuery] =
    api.alerts.getAllAlertSummaries.useSuspenseQuery();
  const { selectedAnomalyId, machineNameFilter, dateRangeFilter } =
    useAlertStore();
  const filteredData = React.useMemo(
    () =>
      data?.filter((alert) => {
        const alertTime = new Date(alert.timestamp).getTime();
        const fromTime = dateRangeFilter?.from?.getTime();
        const toTime = dateRangeFilter?.to?.getTime();
        const isAfterFromTime = fromTime ? fromTime <= alertTime : true;
        const isBeforeToTime = toTime ? alertTime <= toTime : true;
        const isBetweenFilteredTimes = isAfterFromTime && isBeforeToTime;
        const isFromSelectedMachine =
          machineNameFilter === "all"
            ? true
            : alert.machineName === machineNameFilter;

        return isBetweenFilteredTimes && isFromSelectedMachine;
      }),
    [machineNameFilter, dateRangeFilter, data],
  );

  const newAlerts = React.useMemo(
    () => filteredData?.filter((alert) => !alert.hasBeenRead),
    [filteredData],
  );
  return (
    <div className={cn("h-full w-80 overflow-y-auto rounded-md border-r")}>
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
        <p>{filteredData?.length} Alerts</p>
        <Badge bgColor="var(--primary)" color="#FFF">
          {newAlerts?.length} new
        </Badge>
      </div>

      {/* alert card container */}
      <div
        className={cn("flex w-full flex-col gap-y-3 rounded-md border-t p-4")}
      >
        {filteredData?.map((alert) => (
          <AlertCard
            key={alert.anomalyId}
            isSelected={selectedAnomalyId === alert.anomalyId}
            data={alert}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
