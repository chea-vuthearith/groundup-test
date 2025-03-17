"use client";
import WaveSurferReact from "@wavesurfer/react";
import type WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
type Props = {
  title: string;
  audioUrl: string;
};
const SoundCharts = (props: Props) => {
  const onInit = (wavesurfer: WaveSurfer) => {
    wavesurfer.registerPlugin(
      Spectrogram.create({
        labels: true,
        scale: "mel", // or 'linear', 'logarithmic', 'bark', 'erb'
        frequencyMax: 16384,
        frequencyMin: 0,
        labelsBackground: "rgba(0, 0, 0, 0.1)",
      }),
    );
  };

  return (
    <>
      <div className="relative flex grow flex-col gap-y-2">
        <h2 className="text-xl">{props.title}</h2>
        <div className="[&_div]:flex [&_div]:flex-col-reverse [&_div]:gap-y-4">
          <WaveSurferReact
            waveColor="#526cfe"
            onInit={onInit}
            mediaControls
            url={props.audioUrl}
          />
        </div>
      </div>
    </>
  );
};

export default SoundCharts;
