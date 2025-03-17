"use client";
import { Triangle } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useAlertStore } from "../../hooks/use-alert-store";
import AlertCard from "../alert-card";
import Badge from "../badge";

const Sidebar = () => {
  const getAllAlertSummariesQuery = api.alerts.getAllAlertSummaries.useQuery();
  const { selectedAnomalyId } = useAlertStore();
  const { data, isLoading } = getAllAlertSummariesQuery;
  const newAlerts = React.useMemo(
    () => data?.filter((alert) => !alert.hasBeenRead),
    [data],
  );
  return (
    <div className={cn("h-full min-w-80 overflow-hidden rounded-md border-r")}>
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
        <p>{data?.length} Alerts</p>{" "}
        <Badge bgColor="var(--primary)" color="#FFF">
          {newAlerts?.length} new
        </Badge>
      </div>

      {/* alert card container */}
      <div
        className={cn(
          "flex w-full flex-col gap-y-3 overflow-y-auto rounded-md border-t p-4",
        )}
      >
        {data?.map((alert) => (
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
