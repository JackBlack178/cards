import { useAppDispatch, useAppSelector } from "./useAppDispatch.ts";
import { articleActions } from "../store/articles";

export const useFavoriteCard = () => {
  const favoriteCards = useAppSelector((state) => state.article.favorites);
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (id: number) => {
    dispatch(articleActions.changeFavoriteStatus(id));
  };

  return {
    handleFavoriteClick,
    favoriteCards,
  };
};
