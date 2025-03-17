import {
  alertRepository,
  anomalyRepository,
  soundClipRepository,
} from "../repositories";
import { AlertService } from "./alert-service";
import { SoundClipService } from "./sound-clip-service";

export const alertService = new AlertService(
  alertRepository,
  anomalyRepository,
);

export const soundClipService = new SoundClipService(soundClipRepository);
