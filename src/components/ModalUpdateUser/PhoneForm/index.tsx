import style from "../styles.module.scss";
import { api } from "@/services/api";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, phoneSchema } from "@/schemas/phone-mail.schemas";
import { AuthContext } from "@/providers/AuthContext";

export default function MiniPhoneForm({ userId }: Phone) {
  const { setPhone } = useContext(AuthContext);
  const token = localStorage.getItem("@TOKEN");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Phone>({
    resolver: zodResolver(phoneSchema),
  });

  async function onSubmit(data: any) {
    const response = await api.post("phone", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPhone((previousData: Phone[]) => [response.data, ...previousData]);
    reset();
  }
  return (
    <>
      <form
        className={style.adtionalMailPhone}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Telefone</h3>
        <input type="text" placeholder="Novo telefone" {...register("phone")} />
        <input
          type="text"
          value={userId}
          className={style.fixedValue}
          {...register("userId")}
        />
        <button type="submit" className={style.add}>
          +
        </button>
      </form>
    </>
  );
}
