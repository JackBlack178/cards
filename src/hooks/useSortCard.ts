import React, { useEffect, useState } from "react";
import { option } from "../components/ui/InputMenu.tsx";
import {
  Category,
  useGetArticlesQuery,
  useGetCategoriesQuery,
} from "../lib/articleAPI.ts";
import { IArticle } from "../store/articles";

export function useSortCard() {
  const { data: dataArticles, isLoading } = useGetArticlesQuery(undefined);
  const { data: dataCategory } = useGetCategoriesQuery(undefined);

  const articles: IArticle[] = dataArticles || [];
  const categories: Category[] = dataCategory || [];

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

  //todo Подумать насчет двойного рендеринга и переписать костыль ниже, но оно работает

  useEffect(() => {
    if (!queryInput && !selectedSort?.value) setStateArticles(articles);
    else {
      setStateArticles(sortedAndSearchArticles);
    }
  }, [queryInput, selectedSort, isLoading, dataArticles]);

  return {
    handleInputChange,
    sortOptions,
    stateArticles,
    setSelectedSort,
    isLoading,
  };
}
