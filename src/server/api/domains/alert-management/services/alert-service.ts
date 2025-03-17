import type { AnomalyProps } from "../models/anomaly";
import type { AlertRepository } from "../repositories/alert-repository";
import type { AnomalyRepository } from "../repositories/anomaly-repository";

type alertDetails = Partial<
  Pick<AnomalyProps, "comments" | "actionRequired" | "suspectedReason">
>;
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

  public async modifyAlertDetails(
    anomalyId: number,
    alertDetails: alertDetails,
  ) {
    const anomaly = await this.anomalyRepository.findOneById(anomalyId);
    const { comments, actionRequired, suspectedReason } = alertDetails;
    if (comments) anomaly.setComment(comments);
    if (actionRequired) anomaly.setActionRequired(actionRequired);
    if (suspectedReason) anomaly.setSuspectedReason(suspectedReason);
    await this.anomalyRepository.update(anomaly);
  }
}
