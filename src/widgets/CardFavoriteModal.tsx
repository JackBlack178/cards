import cl from "./CardFavoriteModal.module.scss";
import { FC, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { clsx } from "clsx";
import { useFavoriteCard } from "../hooks/useFavoriteCard.ts";
import { DeleteIcon } from "../components/simple/DeleteIcon.tsx";
import { useChangeFavoriteStateMutation } from "../lib/articleAPI.ts";
import { IArticle } from "../store/articles";
import "./temp.scss";

interface CardFavoriteModalProps {
  show: boolean;
  closeFavCards: () => void;
}

const CardFavoriteModal: FC<CardFavoriteModalProps> = ({
  show,
  closeFavCards,
}) => {
  const nodeRef = useRef(null);
  const { favoriteCards } = useFavoriteCard();

  const [changeArticleFavoriteState] = useChangeFavoriteStateMutation();
  const deleteFavorite = async (article: IArticle) => {
    console.log("Удаление");
    await changeArticleFavoriteState({
      id: article.id,
      isFavorite: false,
    }).unwrap();
  };

  return (
    <CSSTransition
      unmountOnExit
      mountOnEnter
      nodeRef={nodeRef}
      in={show}
      timeout={1000}
      classNames={clsx("my-node")}
    >
      <div ref={nodeRef} className={cl.Card_list}>
        <div className={cl.Card_list__header}>
          <button
            onClick={closeFavCards}
            className={cl.Card_list__button_close}
          ></button>
          Любимые статьи
          <span className={cl.Card_list__header_opacitiy}></span>
        </div>
        <div className={cl.Card_list__body}>
          <TransitionGroup>
            {favoriteCards.map((card, index) => (
              <CSSTransition key={card.id} classNames="item" timeout={500}>
                <div className={cl.Card_list__card}>
                  <div className={cl.Card__list__card_title}>
                    <a
                      href={card.url}
                      target="_blank"
                      className={cl.Card_list__link}
                    >
                      {index + 1}. {card.title}
                    </a>
                  </div>
                  <button
                    className={cl.Card_list__button_delete}
                    onClick={() => deleteFavorite(card)}
                  >
                    <DeleteIcon className={cl.Card_list__delete_icon} />
                  </button>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </CSSTransition>
  );
};

export { CardFavoriteModal };
