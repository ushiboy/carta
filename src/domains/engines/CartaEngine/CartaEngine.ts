import EventEmitter from "eventemitter3";

import {
  PairCard,
  ScoreInfo,
  ToriFudaInfo,
  ToriFudaStatus,
  YomiFudaInfo,
} from "@/domains/models/carta";
import { ShuffleRule, randomShuffleFudas } from "@/domains/rules/ShuffleRule";

export interface CartaEngineEvent {
  nextFuda: {
    toriFudas: ToriFudaInfo[];
    yomiFuda: string;
    isGameOver: boolean;
  };
}

export interface OnNextFudaListener {
  (data: {
    toriFudas: ToriFudaInfo[];
    yomiFuda: string;
    isGameOver: boolean;
  }): void;
}

export class CartaEngine {
  private toriFudas: ToriFudaInfo[] = [];
  private yomiFudas: YomiFudaInfo[] = [];
  private shuffleRule: ShuffleRule;
  private emitter = new EventEmitter<CartaEngineEvent>();

  constructor(
    private pairCards: PairCard[],
    shuffleRule?: ShuffleRule,
  ) {
    this.shuffleRule = shuffleRule || randomShuffleFudas;
  }

  startGame(): CartaEngine {
    const toriFudas: ToriFudaInfo[] = [];
    const yomiFudas: YomiFudaInfo[] = [];
    this.pairCards.forEach(({ id, tori, yomi }) => {
      toriFudas.push({
        id,
        text: tori,
        status: ToriFudaStatus.Default,
      });
      yomiFudas.push({
        id,
        text: yomi,
      });
    });

    this.yomiFudas = this.shuffleRule(yomiFudas);
    this.toriFudas = this.shuffleRule(toriFudas);
    this.emitNextFuda();
    return this;
  }

  yomi(): string {
    return this.yomiFudas[0]?.text || "";
  }

  tori(toriFuda: ToriFudaInfo): boolean {
    const correctId = this.yomiFudas[0].id;
    const result = toriFuda.id === correctId;

    this.toriFudas = this.toriFudas.map((t) => {
      if (t.id === correctId) {
        return {
          ...t,
          status: result
            ? ToriFudaStatus.Corrected
            : ToriFudaStatus.Incorrected,
        };
      }
      return t;
    });

    this.yomiFudas.shift();
    this.emitNextFuda();

    return result;
  }

  isGameOver(): boolean {
    return this.yomiFudas.length === 0;
  }

  getAllToriFudas(): ToriFudaInfo[] {
    return [...this.toriFudas];
  }

  getScore(): ScoreInfo {
    const corrected = this.toriFudas.reduce((result, fuda) => {
      if (fuda.status === ToriFudaStatus.Corrected) {
        result += 1;
      }
      return result;
    }, 0);
    const total = this.toriFudas.length;
    const incorrected = total - corrected;

    return {
      rate: Math.floor((corrected / total) * 100),
      corrected,
      incorrected,
      total,
    };
  }

  onNextFuda(listener: OnNextFudaListener) {
    this.emitter.on("nextFuda", listener);
  }

  dispose() {
    this.emitter.removeAllListeners();
  }

  private emitNextFuda() {
    setTimeout(() => {
      this.emitter.emit("nextFuda", {
        toriFudas: this.getAllToriFudas(),
        yomiFuda: this.yomi(),
        isGameOver: this.isGameOver(),
      });
    }, 0);
  }
}
