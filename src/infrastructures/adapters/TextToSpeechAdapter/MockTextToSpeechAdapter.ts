import { TextToSpeechAdapterInterface } from "./TextToSpeechAdapter";

export class MockTextToSpeechAdapter implements TextToSpeechAdapterInterface {
  private muted: boolean = false;

  speech(_text: string): void {
    // nothing
  }

  cancel(): void {
    // nothing
  }

  isMuted(): boolean {
    return this.muted;
  }

  mute(): void {
    this.muted = true;
  }

  unmute(): void {
    this.muted = false;
  }
}
