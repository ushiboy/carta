export interface TextToSpeechAdapterInterface {
  speech(text: string): void;

  cancel(): void;
}

export class TextToSpeechAdapter implements TextToSpeechAdapterInterface {
  private voice: SpeechSynthesisVoice | null;

  constructor() {
    this.voice =
      speechSynthesis.getVoices().find((v) => v.lang === "ja-JP") || null;
  }

  speech(text: string): void {
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
