import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IArticle } from "../store/articles";

export type Articles = IArticle[];

export type Category = {
  id: number;
  name: string;
};

let oneTime = true;
const delayedFetchBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  if (oneTime) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    oneTime = false;
  }

  return fetchBaseQuery({ baseUrl: "http://localhost:3000/" })(
    args,
    api,
    extraOptions,
  );
};

export const articleAPI = createApi({
  reducerPath: "articleAPI",
  tagTypes: ["articles", "categories"],

  baseQuery: delayedFetchBaseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query<Articles, undefined>({
      query: () => "articles",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "articles" as const, id })),
              { type: "articles", id: "LIST" },
            ]
          : [{ type: "articles", id: "LIST" }],
    }),
    getCategories: builder.query<Category[], undefined>({
      query: () => "categories",
      providesTags: ["categories"],
    }),
    changeFavoriteState: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `articles/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "articles", id: "LIST" }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useChangeFavoriteStateMutation,
} = articleAPI;
