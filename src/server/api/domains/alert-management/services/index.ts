import { alertRepository, anomalyRepository } from "../repositories";
import { AlertService } from "./alert-service";

export const alertService = new AlertService(
  alertRepository,
  anomalyRepository,
);
