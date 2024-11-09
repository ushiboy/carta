import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    clearMocks: true,
    coverage: {
      ...configDefaults.coverage,
      exclude: [
        ...configDefaults.coverage.exclude!,
        "*.config.*",
        "src/main.tsx",
        "src/presentations/App.tsx",
        "src/**/*.stories.ts",
      ],
      reporter: ["text", "json-summary", "json", "html"],
      reportOnFailure: true,
      clean: true,
      all: true,
    },
  },
});
