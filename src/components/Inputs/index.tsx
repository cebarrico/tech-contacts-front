import sytle from "./styles.module.scss";

export default function InputComponent(props: any) {
  return (
    <label className={sytle.container} htmlFor={props.label}>
      {...props.label}
      <input {...props} />
    </label>
  );
}
