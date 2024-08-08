import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
=======
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
>>>>>>> d4b43e5e1bad0fbc529e1c9004daa172a732b614
  </React.StrictMode>,
);
