import style from "../styles.module.scss";
import { api } from "@/services/api";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email, emailSchema } from "@/schemas/phone-mail.schemas";
import { AuthContext } from "@/providers/AuthContext";

export default function MiniEmailForm({ userId }: Email) {
  const { setEmail } = useContext(AuthContext);
  const token = localStorage.getItem("@TOKEN");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Email>({
    resolver: zodResolver(emailSchema),
  });

  async function onSubmit(data: any) {
    const response = await api.post("email", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmail((previousData: Email[]) => [response.data, ...previousData]);
    reset();
  }
  return (
    <>
      <form
        className={style.adtionalMailPhone}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Email</h3>
        <input type="email" placeholder="Novo email" {...register("email")} />
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
