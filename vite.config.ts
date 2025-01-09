import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Extra",
        short_name: "Extra",
        theme_color: "#302E34",
        background_color: "#F5C001",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});

// 절대경로 참고용

// resolve: {
//   alias: [
//     { find: "@", replacement: "src/*" },
//     { find: "@api", replacement: "src/api/*" },
//     { find: "@assets/", replacement: "src/assets/*" },
//     { find: "@components", replacement: "src/components/*" },
//     { find: "@pages", replacement: "src/pages/*" },
//     { find: "@redux", replacement: "src/redux/*" },
//     { find: "@utills", replacement: "src/utills/*" },
//   ],
// },
