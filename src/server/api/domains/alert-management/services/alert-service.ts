import { TRPCError } from "@trpc/server";
import type { AlertRepository } from "../repositories/alert-repository";
import type { AnomalyRepository } from "../repositories/anomaly-repository";

export class AlertService {
  constructor(
    private readonly alertRepository: AlertRepository,
    private readonly anomalyRepository: AnomalyRepository,
  ) {}

  public async fetchAllAlertSummaries() {
    return await this.alertRepository.findAllSummaries();
  }

  public async fetchAlertDetail(anomalyId: number) {
    return await this.alertRepository.findOneWithDetailsByAnomalyId(anomalyId);
  }

  public async markAlertAsread(anomalyId: number) {
    const anomaly = await this.anomalyRepository.findOneById(anomalyId);
    if (!anomaly)
      throw new TRPCError({ message: "Anomaly not found", code: "NOT_FOUND" });
    await this.anomalyRepository.update(anomaly?.setReadStatus(true));
  }
}
