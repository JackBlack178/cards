import {
  useChangeFavoriteStateMutation,
  useGetArticlesQuery,
} from "../lib/articleAPI.ts";
import { IArticle } from "../store/articles";

export const useFavoriteCard = () => {
  const [changeArticleFavoriteState] = useChangeFavoriteStateMutation();

  const handleFavoriteClick = async (article: IArticle) => {
    await changeArticleFavoriteState({
      id: article.id,
      isFavorite: !article.isFavorite,
    }).unwrap();
  };

  const { data } = useGetArticlesQuery(undefined);
  const favoriteCards = data?.filter((article) => article.isFavorite) || [];

  return {
    handleFavoriteClick,
    favoriteCards,
  };
};
