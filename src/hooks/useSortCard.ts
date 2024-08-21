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

  const sortedArticles = sortArticles(selectedSort, articles);
  const sortedAndSearchArticles = sortedArticles.filter((article) =>
    article.title.toLowerCase().startsWith(queryInput.toLowerCase()),
  );

  const [stateArticles, setStateArticles] = useState(articles);

  const sortOptions = processOptions(categories);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

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

function sortArticles(selectedSort: option | undefined, articles: IArticle[]) {
  return articles.filter((article) => {
    if (selectedSort?.value === "") return article;

    if (selectedSort?.value === "favorite") return article.isFavorite;

    return article.category === selectedSort?.value;
  });
}

function processOptions(categories: Category[]) {
  const sortOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  sortOptions.push({
    value: "favorite",
    label: "Избранные",
  });

  return sortOptions;
}
