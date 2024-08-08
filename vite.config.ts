import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});

// 절대경로 참고용

// resolve: {
//   alias: [
//     { find: "@", replacement: "src/*" },
//     { find: "@api", replacement: "src/api/*" },
//     { find: "@assets", replacement: "src/assets/*" },
//     { find: "@components", replacement: "src/components/*" },
//     { find: "@pages", replacement: "src/pages/*" },
//     { find: "@redux", replacement: "src/redux/*" },
//     { find: "@utills", replacement: "src/utills/*" },
//   ],
// },
