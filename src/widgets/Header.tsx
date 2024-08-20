import cl from "./Header.module.scss";
import { LogoIcon } from "../components/simple/LogoIcon.tsx";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { clsx } from "clsx";
import { useRef } from "react";
import { MenuIcon } from "../components/simple/MenuIcon.tsx";

const Header = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  function handleMenuClick() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }

  return (
    <header className={cl.Header}>
      <div className={cl.Header__inner}>
        <LogoIcon className={cl.Header__logo}></LogoIcon>
        <nav className={clsx(cl.Header__nav, "hidden-mobile")}>
          <ul className={cl.Header__nav_list}>
            <li className={cl.Header__nav_item}>
              <Link to="/" className={cl.Header__nav_link}>
                Home
              </Link>
            </li>
            <li className={cl.Header__nav_item}>
              <Link to="/" className={cl.Header__nav_link}>
                Articles
              </Link>
            </li>
          </ul>
        </nav>
        <Button className={clsx(cl.Header__button, "hidden-mobile")}>
          Sign in
        </Button>
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
              <Link to="/" className={cl.Header__dialog_link}>
                Home
              </Link>
            </li>
            <li className={cl.Header__dialog_item}>
              <Link to="/" className={cl.Header__dialog_link}>
                Articles
              </Link>
            </li>
          </ul>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
