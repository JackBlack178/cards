import { configureStore } from "@reduxjs/toolkit";
import PageSlice from "./pageState/index.ts";
import articleSlice from "./articles";

export const store = configureStore({
  reducer: {
    page: PageSlice,
    article: articleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
