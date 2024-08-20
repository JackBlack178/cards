import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "./useAppDispatch.ts";
import { Page, pageActions } from "../store/pageState";

export const useChangePageState = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();

  function handleMenuClick() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }
  const handleChangePageState = (pageState: Page) => {
    dispatch(pageActions.changePage(pageState));
    if (modalRef?.current?.open) {
      modalRef.current.close();
    }
  };

  const pageState = useAppSelector((state) => state.page.page);

  return {
    pageState,
    handleMenuClick,
    handleChangePageState,
    modalRef,
  };
};
