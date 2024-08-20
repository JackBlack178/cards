import { FC, memo } from "react";
import cl from "./Card.module.scss";
import { FavoriteIcon } from "../components/simple/FavoriteIcon.tsx";
import { clsx } from "clsx";

interface CardProp {
  title: string;
  id: string | number;
  body: string;
  number?: number;
  imageUrl?: string;
  url?: string;
  rating?: number;
  category?: string;
  handleFavoriteClick: (id: string | number) => void;
  isFavorite: boolean;
}

const Card: FC<CardProp> = memo(
  ({
    title,
    body,
    number,
    id,
    url,
    imageUrl,
    category,
    rating,
    handleFavoriteClick,
    isFavorite,
  }) => {
    return (
      <article className={cl.Article}>
        <img className={cl.Article__image} src={imageUrl} alt="" />
        <div className={cl.Article__body}>
          <span className={cl.Article__category}>{category}</span>
          <div className={cl.Article__title_wrapper}>
            <div className={cl.Article__hidden}></div>
            <h3 className={cl.Article__title}>
              {number}. {title}
            </h3>
            <button
              className={cl.Article__favorite}
              onClick={() => handleFavoriteClick(id)}
            >
              <FavoriteIcon
                className={clsx(
                  cl.Article__favorite_icon,
                  isFavorite && cl.Article__favorite_icon_active,
                )}
              ></FavoriteIcon>
            </button>
          </div>
          <div className={cl.Article__text}>
            <p>{body}</p>
          </div>
        </div>
        <div className={cl.Article__extra}>
          <span>Рейтинг: {rating}</span>
          <a className={cl.Article__link} href={url} target="_blank">
            Узнать больше
          </a>
        </div>
      </article>
    );
  },
);

export { Card };
