"use client";
import WaveSurferReact from "@wavesurfer/react";
import type WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import type { RouterOutputs } from "~/trpc/react";

type SoundClipProps = RouterOutputs["alerts"]["getAlertDetails"]["soundClip"];
type Props = {
  title: string;
  data: SoundClipProps;
};

const SoundCharts = (props: Props) => {
  // const decodeAndPatchSoundClipMutation =
  //   api.alerts.decodeAndPatchSoundClip.useMutation();
  //
  // React.useEffect(() => {
  //   if (!props.data?.spectrogram) {
  //     decodeAndPatchSoundClipMutation.mutate(
  //       {
  //         soundClipId: props.data.id,
  //       },
  //       {
  //         onSuccess: () => toast("encoded spectrogram"),
  //         onError: () => toast("something went wrong"),
  //       },
  //     );
  //   }
  // }, [props.data.spectrogram]);
  //
  // const blob = new Blob([JSON.stringify(props.data?.spectrogram)], {
  //   type: "application/json",
  // });
  // const url = URL.createObjectURL(blob);

  const onInit = (wavesurfer: WaveSurfer) => {
    wavesurfer.registerPlugin(
      Spectrogram.create({
        labels: true,
        scale: "mel", // or 'linear', 'logarithmic', 'bark', 'erb'
        frequencyMax: 16384,
        frequencyMin: 0,
        // frequenciesDataUrl: props.data?.spectrogram ? url : undefined,
        labelsBackground: "rgba(0, 0, 0, 0.1)",
      }),
    );
  };

  return (
    <>
      <div className="relative flex grow flex-col gap-y-2">
        <h2 className="text-xl">{props.title}</h2>
        <div className="min-h-[400px] [&_div]:flex [&_div]:flex-col-reverse [&_div]:gap-y-4">
          <WaveSurferReact
            waveColor="#526cfe"
            onInit={onInit}
            mediaControls
            url={props.data?.url}
          />
        </div>
      </div>
    </>
  );
};

export default SoundCharts;
