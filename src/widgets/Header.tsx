import cl from "./Header.module.scss";
import { LogoIcon } from "../components/simple/LogoIcon.tsx";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { clsx } from "clsx";
import { MenuIcon } from "../components/simple/MenuIcon.tsx";
import { Page } from "../store/pageState";
import { useChangePageState } from "../hooks/useChangePageState.ts";
import { FavoriteIcon } from "../components/simple/FavoriteIcon.tsx";
import { memo } from "react";

const Header = memo(({ showFavCards }: { showFavCards?: () => void }) => {
  const { handleChangePageState, pageState, handleMenuClick, modalRef } =
    useChangePageState();

  return (
    <header className={cl.Header}>
      <div className={cl.Header__inner}>
        <LogoIcon className={cl.Header__logo}></LogoIcon>
        <nav className={clsx(cl.Header__nav, "hidden-mobile")}>
          <ul className={cl.Header__nav_list}>
            <li className={cl.Header__nav_item}>
              <Link
                onClick={() => handleChangePageState(Page.Home)}
                to="/"
                className={clsx(
                  cl.Header__nav_link,
                  pageState === "Home" && cl.Header__nav_link_active,
                )}
              >
                Home
              </Link>
            </li>
            <li className={cl.Header__nav_item}>
              <Link
                onClick={() => handleChangePageState(Page.About)}
                to="/About"
                className={clsx(
                  cl.Header__nav_link,
                  pageState === "About" && cl.Header__nav_link_active,
                )}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className={cl.Header__buttons_wrapper}>
          <Button className={clsx(cl.Header__button, "hidden-mobile")}>
            Sign in
          </Button>

          <button
            className={clsx(
              cl.Header__button_favorite,
              !showFavCards && "visually-hidden",
            )}
            onClick={showFavCards}
          >
            <FavoriteIcon className={cl.Header__favorite_icon}></FavoriteIcon>
          </button>
        </div>

        <button
          onClick={handleMenuClick}
          className={clsx(cl.Header__button_mobile, "visible-mobile")}
        >
          <MenuIcon className={cl.Header__menu}></MenuIcon>
        </button>
      </div>

      <dialog className={clsx(cl.Header__dialog)} ref={modalRef}>
        <form className={cl.Header__dialog_form} method="dialog">
          <button
            type="submit"
            className={cl.Header__dialog_button_close}
          ></button>
        </form>
        <div className={cl.Header__dialog_inner}>
          <Button className={clsx(cl.Header__dialog_button)}>Sign in</Button>

          <ul className={cl.Header__dialog_list}>
            <li className={cl.Header__dialog_item}>
              <Link
                to="/"
                onClick={() => handleChangePageState(Page.Home)}
                className={clsx(
                  cl.Header__dialog_link,
                  pageState === "Home" && cl.Header__dialog_link_active,
                )}
              >
                Home
              </Link>
            </li>
            <li className={cl.Header__dialog_item}>
              <Link
                to="/About"
                onClick={() => handleChangePageState(Page.About)}
                className={clsx(
                  cl.Header__dialog_link,
                  pageState === "About" && cl.Header__dialog_link_active,
                )}
              >
                Articles
              </Link>
            </li>
          </ul>
        </div>
      </dialog>
    </header>
  );
});

export default Header;
