"use client";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
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

const Topbar = () => {
  const [machineName, setMachineName] = React.useState("all");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div
      className={cn(
        "[&>button]:!ring-0 flex gap-x-4 border-b p-4 [&>button]:border-gray-400 ",
      )}
    >
      <Select value={machineName} onValueChange={setMachineName}>
        <SelectTrigger className={cn("w-36")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {/* TODO set content */}
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
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
                !dateRange && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a filters.date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-auto p-0")} align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Topbar;
