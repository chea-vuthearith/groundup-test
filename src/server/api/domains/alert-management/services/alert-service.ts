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
    const [_, alert] = await Promise.all([
      this.markAlertAsread(anomalyId),
      this.alertRepository.findOneWithDetailsByAnomalyId(anomalyId),
    ]);
    return alert;
  }

  public async markAlertAsread(anomalyId: number) {
    const anomaly = await this.anomalyRepository.findOneById(anomalyId);
    await this.anomalyRepository.update(anomaly?.setReadStatus(true));
  }
}
