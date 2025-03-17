import { dbService } from "~/server/db";
import { AlertRepository } from "./alert-repository";
import { AnomalyRepository } from "./anomaly-repository";
import { SoundClipRepository } from "./sound-clip-repository";

export const alertRepository = new AlertRepository(dbService);
export const anomalyRepository = new AnomalyRepository(dbService);
export const soundClipRepository = new SoundClipRepository(dbService);
