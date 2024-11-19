import { createContext } from "react";

import { TextToSpeechAdapterInterface } from "@/infrastructures/adapters/TextToSpeechAdapter";

type ContextState = {
  textToSpeechAdapter: TextToSpeechAdapterInterface;
};

export const context = createContext(Object.create(null) as ContextState);
