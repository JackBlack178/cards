import cl from "./Spinner.module.scss";
import { clsx } from "clsx";

const Spinner = ({ className }: { className: string }) => {
  return <div className={clsx(className, cl.Spinner)}></div>;
};

export default Spinner;
