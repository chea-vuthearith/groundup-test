import { alertRepository, anomalyReposityor } from "../repositories";
import { AlertService } from "./alert-service";

export const alertService = new AlertService(
  alertRepository,
  anomalyReposityor,
);
