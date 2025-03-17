"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { patchAlertDetailsValidator } from "~/server/api/routers/alerts/validator";
import { actionRequiredEnum, suspectedReasonEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { capitalize } from "~/utils/common";
import { useAlertStore } from "../../hooks/use-alert-store";
import type { AlertDetails } from "../../types";
import SoundCharts from "../sound-charts";

const alertDetailsForm = patchAlertDetailsValidator.omit({ anomalyId: true });
const Content = (props: AlertDetails) => {
  type AlertDetailsForm = z.infer<typeof alertDetailsForm>;
  const form = useForm<AlertDetailsForm>({
    resolver: zodResolver(alertDetailsForm),
  });
  const { selectedAnomalyId } = useAlertStore();

  const patchFormDetailsMutation = api.alerts.patchAlertDetails.useMutation();
  const alertUtils = api.useUtils().alerts;
  const onSubmit = (data: AlertDetailsForm) => {
    patchFormDetailsMutation.mutate(
      { anomalyId: props.anomaly.id, ...data },
      {
        onSuccess: () => {
          toast.success("Details updated!");
          alertUtils.getAlertDetails.invalidate({
            anomalyId: props.anomaly.id,
          });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    );
  };
  const getAlertDetailsQuery = api.alerts.getAlertDetails.useQuery({
    anomalyId: selectedAnomalyId,
  });
  const { data, isLoading } = getAlertDetailsQuery;

  if (!selectedAnomalyId) return null;

  return (
    <div className={cn("flex grow flex-col gap-y-7 overflow-y-auto px-9 py-4")}>
      <div>
        <h1 className="text-2xl">Alert ID #{data?.anomaly.id}</h1>
        <p className="text-lg">Detected at {data?.anomaly.timestamp}</p>
      </div>
      {/* charts */}
      <div className="flex w-full border-t pt-4">
        <div className="flex w-full gap-x-14">
          <SoundCharts
            audioUrl={data?.soundClip.url}
            title="Anomaly Machine Output"
          />
          <SoundCharts
            audioUrl={data?.soundClip.url}
            title="Normal Machine Output"
          />
        </div>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="font-bold text-base">Equipment</p>
          <p>{props.machine.name}</p>
          <FormField
            control={form.control}
            name="suspectedReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">
                  Suspected Reason
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn("w-72")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {suspectedReasonEnum.enumValues.map((value, idx) => (
                      <SelectItem value={value} key={idx}>
                        {capitalize(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actionRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">
                  actionRequired
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn("w-72")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actionRequiredEnum.enumValues.map((value, idx) => (
                      <SelectItem value={value} key={idx}>
                        {capitalize(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">Comments</FormLabel>
                <Textarea className="h-24" {...field} />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Content;
