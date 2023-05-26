"use client";

import { useContext } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, userLoginSchema } from "@/schemas/user.schemas";
import { AuthContext } from "@/providers/AuthContext";
import InputComponent from "../Inputs";
import style from "./styles.module.scss";

export default function LoginFormComponent() {
  const { user, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    localStorage.clear();
    login(data);
  };

  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <h1>KenzieContacts</h1>
      <div>
        <Link className={style.login} href="/">
          Login
        </Link>
        <Link className={style.register} href="/register">
          Cadastro
        </Link>
      </div>
      <InputComponent
        type="email"
        placeholder="email"
        label="email"
        {...register("main_email")}
      />
      <InputComponent
        type="password"
        placeholder="password"
        label="password"
        {...register("password")}
      />
      <button className={style.btm} type="submit">
        Logar
      </button>
    </form>
  );
}
