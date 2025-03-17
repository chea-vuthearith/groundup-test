"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import SoundCharts from "../sound-charts";

const Content = () => {
  const { selectedAnomalyId } = useAlertStore();
  const [data, getAlertDetailsQuery] =
    api.alerts.getAlertDetails.useSuspenseQuery({
      anomalyId: selectedAnomalyId,
    });

  const alertDetailsForm = patchAlertDetailsValidator.omit({ anomalyId: true });
  type AlertDetailsForm = z.infer<typeof alertDetailsForm>;

  const defaultValues = React.useMemo(
    () => ({
      comments: data.anomaly.comments ?? "",
      actionRequired: data.anomaly.actionRequired,
      suspectedReason: data.anomaly.suspectedReason,
    }),
    [data],
  );

  const form = useForm<AlertDetailsForm>({
    resolver: zodResolver(alertDetailsForm),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const patchFormDetailsMutation = api.alerts.patchAlertDetails.useMutation();
  const alertUtils = api.useUtils().alerts;
  const onSubmit = (data: AlertDetailsForm) => {
    patchFormDetailsMutation.mutate(
      { anomalyId: selectedAnomalyId, ...data },
      {
        onSuccess: () => {
          toast("Details updated!");
          void alertUtils.invalidate();
        },
        onError: () => {
          toast("Something went wrong");
        },
      },
    );
  };

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form.reset]);

  return (
    <div className={cn("flex grow flex-col gap-y-7 overflow-y-auto px-9 py-4")}>
      <div>
        <h1 className="text-2xl">Alert ID #{data.anomaly.id}</h1>
        <p className="text-lg">
          Detected at {format(data?.anomaly.timestamp, "yyyy-MM-dd kk:mm:ss")}
        </p>
      </div>
      {/* charts */}
      <div className="flex w-full border-t pt-4">
        <div className="flex w-full gap-x-14">
          <SoundCharts
            audioUrl={data.soundClip.url}
            title="Anomaly Machine Output"
          />
          <SoundCharts
            audioUrl={data.soundClip.url}
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
          <p>{data.machine.name}</p>
          <FormField
            control={form.control}
            name="suspectedReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">
                  Suspected Reason
                </FormLabel>
                <Select
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className={cn("w-72")}>
                    <SelectValue placeholder="Select Reason" />
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
                  Action Required
                </FormLabel>
                <Select
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className={cn("w-72")}>
                    <SelectValue placeholder="Select Action" />
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
                <Textarea
                  className="h-24"
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="hover:!bg-primary max-w-24 rounded-lg bg-primary px-4 py-2 font-bold text-white opacity-100 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            disabled={
              patchFormDetailsMutation.isPending || !form.formState.isValid
            }
          >
            UPDATE
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Content;
