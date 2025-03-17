"use client";
import React from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
type Props = {
  title: string;
  audioUrl: string;
};
const SoundCharts = (props: Props) => {
  const audioUrl = "/1.wav";
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const wavesurferOptions = React.useMemo(
    () => ({
      url: audioUrl,
      getPlugins: () => [
        Spectrogram.create({
          labels: true,
          frequencyMax: 8192,
          labelsBackground: "rgba(0, 0, 0, 0.1)",
        }),
      ],
      plugins: [],
    }),
    [audioUrl],
  );

  React.useEffect(() => {
    WaveSurfer.create({
      ...wavesurferOptions,
      mediaControls: true,
      container: containerRef.current as HTMLElement,
      plugins: wavesurferOptions.getPlugins(),
    });
  }, []);

  return (
    <div className="flex grow flex-col gap-y-2">
      <h2 className="text-xl">{props.title}</h2>
      <div
        ref={containerRef}
        className="[&_div]:flex [&_div]:flex-col-reverse [&_div]:gap-y-4"
      />
    </div>
  );
};

export default SoundCharts;
