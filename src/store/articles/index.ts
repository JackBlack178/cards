import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IArticle {
  id: string | number;
  title: string;
  body: string;
  author?: string;
  rating?: number;
  url?: string;
}

type stateType = {
  articles: IArticle[];
};

const initialState: stateType = {
  articles: [],
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticles: (state: stateType, action: PayloadAction<IArticle[]>) => {
      state.articles = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;
export default articleSlice.reducer;
