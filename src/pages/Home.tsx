import Header from "../widgets/Header.tsx";
import cl from "./Home.module.scss";
import { InputMenu, option } from "../components/ui/InputMenu.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch.ts";
import { useEffect, useState } from "react";
import { getArticles } from "../lib/actions.ts";
import { Card } from "../widgets/Card.tsx";

const Home = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.article.articles);

  const [stateArticles, setStateArticles] = useState(articles);
  const categories = useAppSelector((state) => state.article.categories);

  const [selectedSort, setSelectedSort] = useState<option>();
  const sortOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  useEffect(() => {
    setStateArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (selectedSort)
      setStateArticles(
        articles.filter((article) => article.category === selectedSort.value),
      );
  }, [selectedSort]);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <>
      <Header></Header>
      <section className={cl.Home}>
        <h1 className={cl.Home__title}>Позновательные статьи и факты</h1>
        <div className={cl.Home__inner}>
          <div className={cl.Home__params}>
            <InputMenu
              menuName="Сортировка"
              options={sortOptions}
              setSelectState={setSelectedSort}
              className={cl.Home__params_select}
            />
            <div className={cl.Home__params_input_wrapper}>
              <label htmlFor="query">Поиск</label>
              <input id="query" className={cl.Home__params_input} />
            </div>
          </div>
        </div>
      </section>

      <section className={cl.Cards}>
        {stateArticles.map((article, index) => (
          <Card
            title={article.title}
            body={article.body}
            number={index + 1}
            key={article.id}
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
