import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
const isReplit = process.env.REPL_ID !== undefined;

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig(async () => {
  const extraPlugins = [];

  if (!isProduction) {
    const { default: runtimeErrorOverlay } = await import(
      "@replit/vite-plugin-runtime-error-modal"
    );
    extraPlugins.push(runtimeErrorOverlay());
  }

  if (!isProduction && isReplit) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    extraPlugins.push(
      cartographer({ root: path.resolve(import.meta.dirname, "..") }),
    );
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    extraPlugins.push(devBanner());
  }

  return {
    base: basePath,
    plugins: [react(), tailwindcss(), ...extraPlugins],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "../../public"),
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
