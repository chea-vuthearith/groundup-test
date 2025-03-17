import type { DateRange } from "react-day-picker";
import { create } from "zustand";
import type { AlertDetails } from "../types";

type AnomalyId = AlertDetails["anomaly"]["id"];
type MachineName = AlertDetails["machine"]["name"];
type AlertStore = {
  selectedAnomalyId: AnomalyId;
  dateRangeFilter: DateRange | undefined;
  machineNameFilter: MachineName;
  setSelectedAnomalyId: (anomalyId: AnomalyId) => void;
  setDateRangeFilter: (dateRange: DateRange | undefined) => void;
  setMachineNameFilter: (machineName: MachineName) => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  selectedAnomalyId: 1,
  machineNameFilter: "all",
  dateRangeFilter: undefined,
  setDateRangeFilter: (dateRandge) => set({ dateRangeFilter: dateRandge }),
  setMachineNameFilter: (machineName) =>
    set({ machineNameFilter: machineName }),
  setSelectedAnomalyId: (anomalyId) => set({ selectedAnomalyId: anomalyId }),
}));
