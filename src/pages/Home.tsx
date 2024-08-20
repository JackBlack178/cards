import Header from "../widgets/Header.tsx";
import cl from "./Home.module.scss";
import { InputMenu } from "../components/ui/InputMenu.tsx";

import React from "react";

import { Card } from "../widgets/Card.tsx";
import { useSortCard } from "../hooks/useSortCard.ts";
import { useFavoriteCard } from "../hooks/useFavoriteCard.ts";

const Home = () => {
  const { handleInputChange, sortOptions, stateArticles, setSelectedSort } =
    useSortCard();

  const { handleFavoriteClick } = useFavoriteCard();

  return (
    <>
      <Header></Header>
      <section className={cl.Home}>
        <h1 className={cl.Home__title}>Позновательные статьи и факты</h1>
        <div className={cl.Home__inner}>
          <div className={cl.Home__params}>
            <InputMenu
              menuName="Тип"
              options={sortOptions}
              setSelectState={setSelectedSort}
              className={cl.Home__params_select}
              placeholder="Тип статьи"
            />
            <div className={cl.Home__params_input_wrapper}>
              <label htmlFor="query">Поиск</label>
              <input
                placeholder="Search ..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
                id="query"
                className={cl.Home__params_input}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={cl.Cards}>
        {stateArticles.map((article, index) => (
          <Card
            isFavorite={article.isFavorite}
            title={article.title}
            body={article.body}
            number={index + 1}
            key={article.id}
            id={article.id}
            handleFavoriteClick={() => handleFavoriteClick(article.id)}
            url={article.url}
            imageUrl={article.imageUrl}
            category={article.category}
            rating={article.rating}
          ></Card>
        ))}
      </section>
    </>
  );
};

export { Home };
