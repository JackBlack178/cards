import Header from "../widgets/Header.tsx";
import cl from "./Home.module.scss";
import "./home.scss";
import { InputMenu } from "../components/ui/InputMenu.tsx";

import React, { useCallback, useState } from "react";

import { Card } from "../widgets/Card.tsx";
import { useSortCard } from "../hooks/useSortCard.ts";
import { useFavoriteCard } from "../hooks/useFavoriteCard.ts";
import { CardFavoriteModal } from "../widgets/CardFavoriteModal.tsx";
import Spinner from "../components/simple/Spinner.tsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Home = () => {
  const {
    handleInputChange,
    sortOptions,
    stateArticles,
    setSelectedSort,
    isLoading,
  } = useSortCard();
  const { handleFavoriteClick } = useFavoriteCard();

  const [showFavoriteCard, setShowFavoriteCard] = useState<boolean>(false);
  const showFavoriteCards = useCallback(() => setShowFavoriteCard(true), []);
  const closeFavoriteCards = useCallback(() => setShowFavoriteCard(false), []);

  return (
    <>
      <Header showFavCards={showFavoriteCards}></Header>
      {isLoading ? (
        <Spinner className={cl.Home__spinner}></Spinner>
      ) : (
        <>
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

          <section>
            <TransitionGroup className={cl.Cards}>
              {stateArticles!.map((article, index) => (
                <CSSTransition
                  timeout={500}
                  key={article.id}
                  in={!!article}
                  classNames="card-dynamic"
                >
                  <Card
                    isFavorite={article.isFavorite}
                    title={article.title}
                    body={article.body}
                    number={index + 1}
                    key={article.id}
                    id={article.id}
                    handleFavoriteClick={() => handleFavoriteClick(article)}
                    url={article.url}
                    imageUrl={article.imageUrl}
                    category={article.category}
                    rating={article.rating}
                  ></Card>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </section>
          <CardFavoriteModal
            closeFavCards={closeFavoriteCards}
            show={showFavoriteCard}
          ></CardFavoriteModal>
        </>
      )}
    </>
  );
};

export { Home };
