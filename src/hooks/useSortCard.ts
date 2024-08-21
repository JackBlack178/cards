import { useAppDispatch } from "./useAppDispatch.ts";
import React, { useEffect, useState } from "react";
import { option } from "../components/ui/InputMenu.tsx";
import { getArticles } from "../lib/actions.ts";
import { useGetArticlesQuery } from "../lib/articleAPI.ts";
import { IArticle } from "../store/articles";

export function useSortCard() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetArticlesQuery(undefined);

  const articles: IArticle[] = data?.body || [];
  const categories: { id: number; name: string }[] = data?.categories || [];

  const [selectedSort, setSelectedSort] = useState<option>();
  const [queryInput, setQueryInput] = useState<string>("");

  const sortedArticles = articles.filter((article) => {
    if (selectedSort?.value === "") return article;

    if (selectedSort?.value === "favorite") return article.isFavorite;

    return article.category === selectedSort?.value;
  });

  const sortedAndSearchArticles = sortedArticles.filter((article) =>
    article.title.startsWith(queryInput),
  );

  const [stateArticles, setStateArticles] = useState(articles);

  const sortOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  sortOptions.push({
    value: "favorite",
    label: "Избранные",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  // useEffect(() => {
  //   console.log("called1");
  //   setStateArticles(articles);
  // }, [articles]);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  //todo Подумать насчет двойного рендеринга и переписать костыль ниже, но оно работает

  useEffect(() => {
    if (!queryInput && !selectedSort?.value) setStateArticles(articles);
    else {
      setStateArticles(sortedAndSearchArticles);
    }
  }, [queryInput, selectedSort, isLoading]);

  return {
    handleInputChange,
    sortOptions,
    stateArticles,
    setSelectedSort,
    isLoading,
  };
}
