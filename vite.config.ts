import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/fari-app/",
  define: {
    "process.env.npm_package_version": JSON.stringify(
      process.env.npm_package_version
    ),
    "process.env.JEST_WORKER_ID": JSON.stringify(false),
  },
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    port: 1234,
    proxy: {
      "/.netlify/functions/auth": "http://localhost:9999",
    },
  },
  optimizeDeps: {},
  test: {
    globals: true,
    globalSetup: ["global-test-setup.ts"],
    environment: "jsdom",
  },
});
