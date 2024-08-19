import Header from "../widgets/Header.tsx";
import cl from "./Home.module.scss";
import { InputMenu } from "../components/ui/InputMenu.tsx";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { useEffect } from "react";
import { getArticles } from "../lib/actions.ts";

const sortTypes = [
  {
    value: "title",
    label: "По названию",
  },
  {
    value: "Compeleted",
    label: "По статусу выполнения",
  },
];

const defaultSortState = sortTypes[0];

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <>
      <Header></Header>
      <section className={cl.Home}>
        <div className={cl.Home__inner}>
          <div className={cl.Home__params}>
            <InputMenu
              menuName="Сортировка"
              options={sortTypes}
              selectedOption={defaultSortState}
              className={cl.Home__params_select}
            />
            <div className={cl.Home__params_input_wrapper}>
              <label htmlFor="query">Поиск</label>
              <input id="query" className={cl.Home__params_input} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Home };
