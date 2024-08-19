import cl from "./InputMenu.module.scss";
import { FC, useState } from "react";
import { Transition } from "react-transition-group";
import Select, { SingleValue } from "react-select";
import { clsx } from "clsx";

type option = {
  value: string;
  label: string;
};

interface InputMenuProps {
  menuName: string;
  options: option[];
  selectedOption: option;
  timeOut?: number;
  closeOnSelect?: boolean;
  className?: string;
}

const InputMenu: FC<InputMenuProps> = ({
  menuName,
  options,
  selectedOption,
  timeOut = 500,
  closeOnSelect = true,
  className,
}) => {
  const [selected, setSelected] = useState<option>(selectedOption);
  const [selectState, setSelectState] = useState<boolean>(false);

  function handleInputChange(event: SingleValue<option>) {
    if (event?.value) setSelected(event);
  }

  return (
    <div className={clsx(cl.InputMenu__wrapper, className)}>
      <span className={cl.InputMenu__title}>{menuName}</span>
      <Transition in={selectState} timeout={timeOut}>
        <Select
          className={cl.InputMenu__select}
          options={options}
          defaultValue={selected}
          closeMenuOnSelect={closeOnSelect}
          onChange={(event) => handleInputChange(event)}
        ></Select>
      </Transition>
    </div>
  );
};

export { InputMenu };
