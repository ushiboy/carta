import {
  PairCard,
  ToriFudaInfo,
  ToriFudaStatus,
  YomiFudaInfo,
} from "@/domains/models/carta";

// 札ペア1
export const pairCard1: PairCard = {
  id: 1,
  yomi: "hello",
  tori: "world",
};

// 札ペア2
export const pairCard2: PairCard = {
  id: 2,
  yomi: "fizz",
  tori: "buzz",
};

// 読み札1
export const yomiFuda1: YomiFudaInfo = {
  id: pairCard1.id,
  text: pairCard1.yomi,
};

// 読み札2
export const yomiFuda2: YomiFudaInfo = {
  id: pairCard2.id,
  text: pairCard2.yomi,
};

// 取札1
export const toriFuda1: ToriFudaInfo = {
  id: pairCard1.id,
  text: pairCard1.tori,
  status: ToriFudaStatus.Default,
};

// 取札2
export const toriFuda2: ToriFudaInfo = {
  id: pairCard2.id,
  text: pairCard2.tori,
  status: ToriFudaStatus.Default,
};
