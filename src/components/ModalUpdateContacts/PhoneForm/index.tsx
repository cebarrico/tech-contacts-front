import style from "../styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, phoneSchema } from "@/schemas/phone-mail.schemas";
export default function MiniPhoneForm() {
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
        <h3>Telefone</h3>
        <input type="text" placeholder="Novo telefone" />
        <button type="submit" className={style.add}>
          +
        </button>
      </form>
    </>
  );
}
