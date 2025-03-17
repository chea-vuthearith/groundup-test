"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useAlertStore } from "../../hooks/use-alert-store";

const Topbar = () => {
  const {
    dateRangeFilter,
    machineNameFilter,
    setDateRangeFilter,
    setMachineNameFilter,
  } = useAlertStore();

  const [alerts, getAllAlertSummariesQuery] =
    api.alerts.getAllAlertSummaries.useSuspenseQuery();

  const machineNames = React.useMemo(
    () => Array.from(new Set(alerts.map((alert) => alert.machineName))),
    [alerts],
  );

  return (
    <div
      className={cn(
        "[&>button]:!ring-0 flex gap-x-4 border-b p-4 [&>button]:border-gray-400",
      )}
    >
      <Select value={machineNameFilter} onValueChange={setMachineNameFilter}>
        <SelectTrigger className={cn("w-36")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {/* TODO set content */}
          <SelectItem value="all">All</SelectItem>
          {machineNames.map((name, idx) => (
            <SelectItem value={name} key={idx}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date */}
      <div className={cn("grid gap-2 ")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="filters.date"
              variant={"outline"}
              className={cn(
                "w-72 justify-start border-gray-400 text-left font-normal",
                !dateRangeFilter && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {dateRangeFilter?.from ? (
                dateRangeFilter.to ? (
                  <>
                    {format(dateRangeFilter.from, "LLL dd, y")} -{" "}
                    {format(dateRangeFilter.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRangeFilter.from, "LLL dd, y")
                )
              ) : (
                <span>Pick some dates to filter through</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-auto p-0")} align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRangeFilter?.from}
              selected={dateRangeFilter}
              onSelect={setDateRangeFilter}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Topbar;
