import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  
  // Parse JSON bodies
  app.use(express.json());
  
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // Always use Vite middleware in development (NODE_ENV check isn't working properly)
  // Since we're running via tsx in dev, assume development mode
  const isDevelopment = process.env.NODE_ENV !== "production";
  
  if (isDevelopment) {
    console.log("🔧 Running in development mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: resolve(__dirname, "../client"),
      configFile: resolve(__dirname, "../vite.config.ts")
    });
    
    app.use(vite.middlewares);
  } else {
    console.log("📦 Running in production mode with static files");
    // In production, serve static files
    app.use(express.static(resolve(__dirname, "../dist/public")));
    
    app.get("*", (req, res) => {
      res.sendFile(resolve(__dirname, "../dist/public/index.html"));
    });
  }

  const port = process.env.PORT || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:5000
:${port}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Error starting server:", err);
  process.exit(1);
});