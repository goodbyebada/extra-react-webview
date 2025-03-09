interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITESERVER_BASEURL: string;
  readonly VITE_FIREBASE_VAPID_KEY: string;
  readonly VITE_KAKAO_API_KEY: string;
  readonly VITE_SECRET_KEY: string;
  readonly VITE_KAKAO_RESTAPI_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
