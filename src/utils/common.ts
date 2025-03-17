import decodeAudioData from "audio-decode";
import FFT from "fft.js";

export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export async function generateSpectrogram(
  audioData: ArrayBuffer,
  fftSize = 512,
): Promise<Uint8Array<ArrayBuffer>[]> {
  // Decode audio data to PCM
  const audioBuffer = await decodeAudioData(audioData);
  const pcmSamples = audioBuffer.getChannelData(0); // Use first channel

  // Initialize FFT
  const fft = new FFT(fftSize);
  const spectrum = [];

  for (let i = 0; i + fftSize < pcmSamples.length; i += fftSize) {
    const input = pcmSamples.slice(i, i + fftSize);
    const freq = fft.createComplexArray();
    fft.realTransform(freq, input);

    // Convert magnitude to Uint8Array (0-255)
    const magnitudes = new Uint8Array(fftSize / 2);
    for (let j = 0; j < fftSize / 2; j++) {
      const magnitude = Math.sqrt(freq[2 * j] ** 2 + freq[2 * j + 1] ** 2);
      magnitudes[j] = Math.min(255, Math.floor(magnitude * 255));
    }

    spectrum.push(magnitudes);
  }

  return spectrum;
}
