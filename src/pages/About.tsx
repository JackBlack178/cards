import cl from "./About.module.scss";
import Header from "../widgets/Header.tsx";

const About = () => {
  return (
    <>
      <Header></Header>
      <section className={cl.About}>
        <h1>Обзор популярных статей</h1>
        <span className={cl.About__body}>
          Представлены научные статьи четырех типов: <br />
          Мифы и реальность, полезные факты, просто о сложном, а также
          интересные факты <br />
          Есть возможность переходить по ссылкам статей, добавлять их в
          избранное и удалить оттуда. <br />
          Также можно сортировать и искать статьи одновременно
        </span>
      </section>
    </>
  );
};

export { About };
