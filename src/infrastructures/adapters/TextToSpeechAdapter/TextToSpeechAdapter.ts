export interface TextToSpeechAdapterInterface {
  speech(text: string): void;

  isMuted(): boolean;

  mute(): void;

  unmute(): void;

  cancel(): void;
}

export class TextToSpeechAdapter implements TextToSpeechAdapterInterface {
  private voice: SpeechSynthesisVoice | null;
  private muted: boolean = false;

  constructor() {
    this.voice =
      speechSynthesis.getVoices().find((v) => v.lang === "ja-JP") || null;
  }

  isMuted(): boolean {
    return this.muted;
  }

  mute(): void {
    this.muted = true;
    this.cancel();
  }

  unmute(): void {
    this.muted = false;
  }

  speech(text: string): void {
    if (this.muted) return;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = this.voice;
    u.rate = 1.2;
    u.pitch = 0.9;
    speechSynthesis.speak(u);
  }

  cancel(): void {
    speechSynthesis.cancel();
  }
}
