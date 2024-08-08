import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@redux/modalSlice";
import recruitReducer from "@redux/recruitSlice";
import homeSelectedDateReducer from "@redux/homeSelectedDateSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    recruit: recruitReducer,
    homeSelectedDate: homeSelectedDateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
