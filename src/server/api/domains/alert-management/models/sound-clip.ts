import type { InferSelectModel } from "drizzle-orm";
import type { soundClips } from "~/server/db/schema";

export type SoundClipProps = InferSelectModel<typeof soundClips>;

export class SoundClip {
  constructor(private readonly props: SoundClipProps) {}

  public getValue() {
    return this.props;
  }

  public setSpectrogram(spectrogram: SoundClipProps["spectrogram"]) {
    this.props.spectrogram = spectrogram;

    return this;
  }
}
