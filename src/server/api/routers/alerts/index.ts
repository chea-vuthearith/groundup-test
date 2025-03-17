import { alertService } from "../../domains/alert-management/services";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  getAlertDetailsValidator,
  patchAlertDetailsValidator,
} from "./validator";

export const alertsRouter = createTRPCRouter({
  getAllAlertSummaries: protectedProcedure.query(async ({ ctx }) => {
    const entities = await alertService.fetchAllAlertSummaries();
    const alerts = entities.map((e) => e.getValue());
    return alerts;
  }),

  getAlertDetails: protectedProcedure
    .input(getAlertDetailsValidator)
    .query(async ({ ctx, input }) => {
      const entity = await alertService.fetchAlertDetail(input.anomalyId);
      const alert = entity.getValue();
      return alert;
    }),

  patchAlertDetails: protectedProcedure
    .input(patchAlertDetailsValidator)
    .mutation(async ({ ctx, input }) => {
      const { anomalyId, ...anomalyDetails } = input;
      await alertService.modifyAlertDetails(anomalyId, anomalyDetails);
    }),
});
