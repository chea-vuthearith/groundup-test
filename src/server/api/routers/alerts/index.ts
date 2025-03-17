import { alertService } from "../../domains/alert-management/services";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const alertsRouter = createTRPCRouter({
  getAllAlertSummaries: protectedProcedure.query(({ ctx }) => {
    alertService.fetchAllAlertSummaries();
  }),
});
