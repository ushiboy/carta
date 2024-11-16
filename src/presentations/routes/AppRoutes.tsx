import { Route, Routes } from "react-router";

import { MainLayout } from "@/presentations/layouts/MainLayout";
import { HomePage } from "@/presentations/pages/HomePage";
import { NotFoundPage } from "@/presentations/pages/NotFoundPage";
import { PlayGamePage } from "@/presentations/pages/PlayGamePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="games/:gameId" element={<PlayGamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
