import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IArticle {
  id: string | number;
  title: string;
  body: string;
  rating?: number;
  url?: string;
  imageUrl?: string;
  category?: string;
  isFavorite: boolean;
}

type Category = {
  id: number;
  name: string;
};

type stateType = {
  articles: IArticle[];
  favorites: Favorite[];
  categories: Category[];
};

const initialState: stateType = {
  articles: [],
  favorites: [],
  categories: [],
};

type Favorite = {
  id: number;
  isFavorite: boolean;
};

type payloadActionType = {
  body: IArticle[];
  favorites: Favorite[];
  categories: Category[];
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
    changeFavoriteStatus: (state: stateType, action: PayloadAction<number>) => {
      const id = action.payload;
      state.articles.map((article) => {
        if (article.id === id) {
          article.isFavorite = !article.isFavorite;
        }
        return article;
      });
    },
  },
});

export const articleActions = articleSlice.actions;
export default articleSlice.reducer;
