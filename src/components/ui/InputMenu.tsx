import cl from "./InputMenu.module.scss";
import { FC } from "react";
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
  placeholder?: string;
  hasEmptyValue?: boolean;
  emptyMessage?: string;
}

const InputMenu: FC<InputMenuProps> = ({
  menuName,
  options,
  closeOnSelect = true,
  className,
  setSelectState,
  placeholder,
  hasEmptyValue = true,
  emptyMessage = "Любая",
}) => {
  function handleInputChange(event: SingleValue<option>) {
    if (event !== null) setSelectState(event);
  }

  if (hasEmptyValue) options.push({ value: "", label: emptyMessage });

  return (
    <div className={clsx(cl.InputMenu__wrapper, className)}>
      <span className={cl.InputMenu__title}>{menuName}</span>
      <Select
        className={cl.InputMenu__select}
        options={options}
        closeMenuOnSelect={closeOnSelect}
        placeholder={placeholder}
        onChange={(event) => handleInputChange(event)}
      ></Select>
    </div>
  );
};

export { InputMenu };
