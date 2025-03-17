import { alertService } from "../../domains/alert-management/services";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { getAlertDetailsValidator } from "./validator";

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
});
