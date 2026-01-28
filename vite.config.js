import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/comments/",

  server: {
    proxy: {
      "/api": {
        target: "http://95.163.242.125",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Username", "sergroznov");
          });
        },
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
