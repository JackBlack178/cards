import { useAppDispatch, useAppSelector } from "./useAppDispatch.ts";
import { articleActions } from "../store/articles";

export const useFavoriteCard = () => {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (id: number) => {
    dispatch(articleActions.changeFavoriteStatus(id));
  };

  const favoriteCards = useAppSelector(
    (state) => state.article.articles,
  ).filter((article) => article.isFavorite);

  return {
    handleFavoriteClick,
    favoriteCards,
  };
};
