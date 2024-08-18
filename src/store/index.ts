import { configureStore } from "@reduxjs/toolkit";
import PageSlice from "./pageState/index.ts";

export const store = configureStore({
  reducer: {
    page: PageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
