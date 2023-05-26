import style from "../styles.module.scss";
import { api } from "@/services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MiniEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <form className={style.adtionalMailPhone} onSubmit={onSubmit}>
        <h3>Email</h3>
        <input type="email" placeholder="Novo email" />
        <button type="submit" className={style.add}>
          +
        </button>
      </form>
    </>
  );
}
