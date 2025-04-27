import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // console.log(mode);
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      visualizer(),
      VitePWA({
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000,
        },
        devOptions: {
          enabled: true,
        },
        registerType: "autoUpdate",
        injectRegister: null,
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

    server:
      !fs.existsSync("./localhost-key.pem") || !fs.existsSync("./localhost.pem")
        ? undefined
        : {
            https: {
              key: fs.readFileSync("./localhost-key.pem"),
              cert: fs.readFileSync("./localhost.pem"),
            },
          },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks(id: string) {
            if (id.includes("firebase")) {
              return "@firebase-module";
            }

            if (id.includes("react-pdf")) {
              return "@react-pdf";
            }

            if (id.includes("pdf-lib")) {
              return "@pdf-module";
            }
            if (id.includes("crypto-js")) {
              return "@crypto-js";
            }
          },
        },
      },
    },
  };
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
