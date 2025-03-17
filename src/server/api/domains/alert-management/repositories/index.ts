import { dbService } from "~/server/db";
import { AlertRepository } from "./alert-repository";
import { AnomalyRepository } from "./anomaly-repository";

export const alertRepository = new AlertRepository(dbService);
export const anomalyReposityor = new AnomalyRepository(dbService);
