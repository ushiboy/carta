import { Route, Routes } from "react-router";

import { MainLayout } from "@/presentations/layouts/MainLayout";
import { HomePage } from "@/presentations/pages/HomePage";
import { NotFoundPage } from "@/presentations/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
