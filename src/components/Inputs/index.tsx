import { forwardRef, InputHTMLAttributes } from "react";
import sytle from "./styles.module.scss";
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  label: string;
}
const Input = (
  { label, type, placeholder, ...rest }: IInputProps,
  ref: any
) => {
  return (
    <label className={sytle.container} htmlFor={label}>
      {label}
      <input type={type} ref={ref} placeholder={placeholder} {...rest} />
    </label>
  );
};
const InputComponent = forwardRef(Input);

export default InputComponent;
