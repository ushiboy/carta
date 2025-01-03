import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { createTheme, DeviceProvider, ThemeProvider } from "smarthr-ui";

import { App } from "@/presentations/App";
import { CrashPage } from "@/presentations/pages/CrashPage";

import "./index.css";
import "smarthr-ui/smarthr-ui.css";

import { CartaDatabase } from "./infrastructures/drivers/dexieDriver";

const db = new CartaDatabase();

const theme = createTheme();

(async () => {
  await setupDemoData(db);
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <DeviceProvider>
          <ErrorBoundary FallbackComponent={CrashPage}>
            <App db={db} />
          </ErrorBoundary>
        </DeviceProvider>
      </ThemeProvider>
    </StrictMode>,
  );
})();

async function setupDemoData(db: CartaDatabase) {
  if ((await db.games.count()) === 0) {
    const gameId = await db.games.add({
      title: "日本の古典",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    const seeds = [
      {
        yomi: "土佐日記の書き出しは？",
        tori: "をとこもすなる",
      },
      {
        yomi: "枕草子の書き出しは？",
        tori: "春はあけぼの",
      },
      {
        yomi: "徒然草の書き出しは？",
        tori: "つれづれなるままに",
      },
      {
        yomi: "源氏物語の書き出しは？",
        tori: "いづれの御時にか",
      },
      {
        yomi: "平家物語の書き出しは？",
        tori: "祇園精舎の鐘の声",
      },
      {
        yomi: "方丈記の書き出しは？",
        tori: "ゆく河の流れ",
      },
      {
        yomi: "竹取物語の書き出しは？",
        tori: "今は昔、竹取の翁",
      },
      {
        yomi: "更級日記の書き出しは？",
        tori: "東路の道の果てより",
      },
      {
        yomi: "雨月物語の書き出しは？",
        tori: "月の名のみかに",
      },
      {
        yomi: "伊勢物語の書き出しは？",
        tori: "昔、男ありけり",
      },
      {
        yomi: "堤中納言物語の書き出しは？",
        tori: "虫めづる姫君",
      },
    ];

    await db.pairCards.bulkAdd(
      seeds.map(({ yomi, tori }) => ({
        gameId,
        yomi,
        tori,
        createdAt: new Date(),
        modifiedAt: new Date(),
      })),
    );
  }
}
