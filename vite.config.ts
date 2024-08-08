import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
<<<<<<< HEAD

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
=======
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
>>>>>>> d4b43e5e1bad0fbc529e1c9004daa172a732b614
