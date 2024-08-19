import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IArticle {
  id: string | number;
  title: string;
  body: string;
  author?: string;
  rating?: number;
  url?: string;
}

type stateType = IArticle[];

const initialState: stateType = [];

export const pageSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticles: (state: stateType, action: PayloadAction<stateType>) => {
      state = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
