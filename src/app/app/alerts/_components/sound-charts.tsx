"use client";
import React from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
type Props = {
  title: string;
  audioUrl: string;
};
const SoundCharts = (props: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const waveSurferRef = React.useRef<WaveSurfer | null>(null);

  const wavesurferOptions = React.useMemo(
    () => ({
      url: props.audioUrl,
      getPlugins: () => [
        Spectrogram.create({
          labels: true,
          frequencyMax: 8192,
          labelsBackground: "rgba(0, 0, 0, 0.1)",
          height: 200,
        }),
      ],
      plugins: [],
    }),
    [props.audioUrl],
  );

  React.useEffect(() => {
    if (!waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        ...wavesurferOptions,
        mediaControls: true,
        container: containerRef.current as HTMLElement,
        plugins: wavesurferOptions.getPlugins(),
      });
    }
    // waveSurferRef.current?.destroy();
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
