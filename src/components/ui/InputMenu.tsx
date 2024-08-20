import cl from "./InputMenu.module.scss";
import { FC, useState } from "react";
import Select, { SingleValue } from "react-select";
import { clsx } from "clsx";

export type option = {
  value: string;
  label: string;
};

interface InputMenuProps {
  menuName: string;
  options: option[];
  timeOut?: number;
  closeOnSelect?: boolean;
  className?: string;
  setSelectState: (state: option) => void;
}

const InputMenu: FC<InputMenuProps> = ({
  menuName,
  options,
  closeOnSelect = true,
  className,
  setSelectState,
}) => {
  function handleInputChange(event: SingleValue<option>) {
    if (event?.value) setSelectState(event);
  }

  return (
    <div className={clsx(cl.InputMenu__wrapper, className)}>
      <span className={cl.InputMenu__title}>{menuName}</span>
      <Select
        className={cl.InputMenu__select}
        options={options}
        closeMenuOnSelect={closeOnSelect}
        onChange={(event) => handleInputChange(event)}
      ></Select>
    </div>
  );
};

export { InputMenu };
