import { TextToSpeechAdapterInterface } from "@/infrastructures/adapters/TextToSpeechAdapter";

import { context } from "./context";

export const AdapterContextProvider: React.FC<{
  textToSpeechAdapter: TextToSpeechAdapterInterface;
  children: React.ReactNode;
}> = ({ textToSpeechAdapter, children }) => {
  return (
    <context.Provider
      value={{
        textToSpeechAdapter,
      }}
    >
      {children}
    </context.Provider>
  );
};
