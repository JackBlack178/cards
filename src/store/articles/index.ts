import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IArticle {
  id: string | number;
  title: string;
  body: string;
  rating?: number;
  url?: string;
  imageUrl?: string;
  category?: string;
}

type stateType = {
  articles: IArticle[];
  favorites: number[];
  categories: string[];
};

const initialState: stateType = {
  articles: [],
  favorites: [],
  categories: [],
};

type payloadActionType = {
  body: IArticle[];
  favorites: number[];
  categories: string[];
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticles: (
      state: stateType,
      action: PayloadAction<payloadActionType>,
    ) => {
      state.articles = action.payload.body;
      state.categories = action.payload.categories;
      state.favorites = action.payload.favorites;
    },
  },
});

export const articleActions = articleSlice.actions;
export default articleSlice.reducer;
