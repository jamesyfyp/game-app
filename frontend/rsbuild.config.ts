import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

// https://rsbuild.dev/guide/basic/configure-rsbuild
export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack(),
      ],
    },
  },
  html: {
    favicon: "src/assets/favicon.ico",
    title: "Loco SaaS Starter",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5150",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
