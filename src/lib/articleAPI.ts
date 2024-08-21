import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../store/articles";

type articleType = {
  body: IArticle[];
  categories: {
    id: number;
    name: string;
  };
};

const delayedFetchBaseQuery = async (args, api, extraOptions) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return fetchBaseQuery({ baseUrl: "http://localhost:3000/" })(
    args,
    api,
    extraOptions,
  );
};

export const articleAPI = createApi({
  reducerPath: "articleAPI",
  baseQuery: delayedFetchBaseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "articles",
    }),
    // changeFavoriteState: builder.mutation({
    //   query: (id) => ({}),
    // }),
  }),
});

export const { useGetArticlesQuery } = articleAPI;
