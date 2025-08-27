import react from "@vitejs/plugin-react";
import express from "express";
import { defineConfig, loadEnv } from "vite";
import healthCheckHandler from "./src/api/healthCheckHandler";
import dataSubmitHandler from "./src/api/dataSubmitHandler";
import apiErrorAndDelaySimulator from "./src/api/apiErrorAndDelaySimulator";

const app = express();
app.use(express.json());
app.use(apiErrorAndDelaySimulator);

// API Routes
app.get("/api/health", healthCheckHandler);
app.post("/api/submit", dataSubmitHandler);

// Proxy config to let Vite know about our API routes
const proxy = {
  "/api": {}, // proxy our /api route to nowhere (handled by middleware)
};

function expressPlugin() {
  return {
    name: "express-plugin",
    config() {
      return {
        server: { proxy },
        preview: { proxy },
      };
    },
    configureServer(server) {
      server.middlewares.use(app);
    },
  };
}

export default defineConfig(({ mode }) => {
  // load all variables, not only those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), "");
  // and add them all to process.env
  process.env = { ...process.env, ...env };

  return {
    plugins: [expressPlugin(), react()],
    server: {
      allowedHosts: true, // Allows all hosts (use with caution)
    },
    test: {
      environment: "jsdom",
    },
  };
});
