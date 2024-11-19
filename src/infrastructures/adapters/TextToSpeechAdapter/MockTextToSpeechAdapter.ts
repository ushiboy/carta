import { TextToSpeechAdapterInterface } from "./TextToSpeechAdapter";

export class MockTextToSpeechAdapter implements TextToSpeechAdapterInterface {
  speech(_text: string): void {
    // nothing
  }
  cancel(): void {
    // nothing
  }
}
