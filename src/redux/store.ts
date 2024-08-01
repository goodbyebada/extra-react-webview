import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@redux/modalSlice";
import recruitReducer from "@redux/recruitSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    recruit: recruitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
