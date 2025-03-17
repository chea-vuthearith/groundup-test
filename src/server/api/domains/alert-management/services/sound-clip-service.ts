import { generateSpectrogram } from "~/utils/common";
import type { SoundClipProps } from "../models/sound-clip";
import type { SoundClipRepository } from "../repositories/sound-clip-repository";

export class SoundClipService {
  constructor(private readonly soundclipRepository: SoundClipRepository) {}

  public async decodeSpectrogramAndStore(soundClipId: SoundClipProps["id"]) {
    const entity = await this.soundclipRepository.findOneById(soundClipId);
    const url = "http://localhost:3000" + entity.getValue().url;
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const spectrogram = await generateSpectrogram(arrayBuffer);
    const updatedEntity = entity.setSpectrogram(spectrogram.toString());
    await this.soundclipRepository.update(updatedEntity);
  }
}
