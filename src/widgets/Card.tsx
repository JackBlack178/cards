import { FC, memo } from "react";
import cl from "./Card.module.scss";

interface CardProp {
  title: string;
  body: string;
  number?: number;
  imageUrl?: string;
  url?: string;
  rating?: number;
  category?: string;
}

const Card: FC<CardProp> = memo(
  ({ title, body, number, url, imageUrl, category, rating }) => {
    console.log("rendering Card");

    return (
      <article className={cl.Article}>
        <img className={cl.Article__image} src={imageUrl} alt="" />
        <div className={cl.Article__body}>
          <span className={cl.Article__category}>{category}</span>
          <h3 className={cl.Article__title}>
            {number}. {title}
          </h3>
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
