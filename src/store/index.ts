import { configureStore } from "@reduxjs/toolkit";
import PageSlice from "./pageState/index.ts";
import articleSlice from "./articles";
import { articleAPI } from "../lib/articleAPI.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    page: PageSlice,
    article: articleSlice,
    [articleAPI.reducerPath]: articleAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
