import { ShuffleRule } from "./type";

export const randomShuffleFudas: ShuffleRule = <T>(fudas: T[]): T[] => {
  const shuffled = [...fudas];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
