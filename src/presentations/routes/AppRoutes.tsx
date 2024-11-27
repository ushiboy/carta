import { Route, Routes } from "react-router";

import { MainLayout } from "@/presentations/layouts/MainLayout";
import { AnalysisGamePage } from "@/presentations/pages/AnalysisGamePage";
import { HomePage } from "@/presentations/pages/HomePage";
import { ImportDataPage } from "@/presentations/pages/ImportDataPage";
import { NotFoundPage } from "@/presentations/pages/NotFoundPage";
import { PlayGamePage } from "@/presentations/pages/PlayGamePage";
import { ScoreAnalysisPage } from "@/presentations/pages/ScoreAnalysisPage";
import { ScoreLogPage } from "@/presentations/pages/ScoreLogPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="games/:gameId" element={<PlayGamePage />} />
        <Route path="games/:gameId/analysis" element={<AnalysisGamePage />} />
        <Route path="scores/" element={<ScoreLogPage />} />
        <Route path="scores/:logId" element={<ScoreAnalysisPage />} />
        <Route path="manage/" element={<ImportDataPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
