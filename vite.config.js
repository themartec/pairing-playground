import react from "@vitejs/plugin-react";
import express from "express";
import { defineConfig } from "vite";
import healthCheckHandler from "./src/api/healthCheckHandler";

const app = express();
app.use(express.json());

// API Routes
app.get("/api/health", healthCheckHandler);

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

export default defineConfig({
  plugins: [expressPlugin(), react()],
});
