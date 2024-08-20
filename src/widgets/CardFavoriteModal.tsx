import cl from "./CardFavoriteModal.module.scss";
import { FC, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./temp.scss";
import { clsx } from "clsx";
import { useFavoriteCard } from "../hooks/useFavoriteCard.ts";
import { DeleteIcon } from "../components/simple/DeleteIcon.tsx";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { articleActions } from "../store/articles";

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

  const dispatch = useAppDispatch();
  const deleteFavorite = (id: number) => {
    dispatch(articleActions.changeFavoriteStatus(id));
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
                    {index + 1}.{" "}
                    <a
                      href={card.url}
                      target="_blank"
                      className={cl.Card_list__link}
                    >
                      {card.title}
                    </a>
                  </div>
                  <button
                    className={cl.Card_list__button_delete}
                    onClick={() => deleteFavorite(card.id)}
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
