"use client";
import { api } from "@/services/api";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/providers/AuthContext";
import { userRegisterSchema, Register } from "@/schemas/user.schemas";
import { ToastContainer, toast } from "react-toastify";

import InputComponent from "../Inputs";
import style from "./styles.module.scss";

export default function RegisterFormComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<Register> = async (data) => {
    try {
      const response = await api.post("users", data);
      router.push("");
      return response;
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <>
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <h1>KenzieContacts</h1>
        <div>
          <a className={style.login} href="/">
            Login
          </a>
          <a className={style.register} href="/register">
            Cadastro
          </a>
        </div>
        <InputComponent
          type="text"
          placeholder="nome"
          label="Nome"
          {...register("first_name")}
        />
        <InputComponent
          type="text"
          placeholder="sobrenome"
          label="Sobrenome"
          {...register("last_name")}
        />
        <InputComponent
          type="email"
          placeholder="email"
          label="Email"
          {...register("main_email")}
        />
        <InputComponent
          type="text"
          placeholder="telefone"
          label="Telefone"
          {...register("main_phone")}
        />
        <InputComponent
          type="password"
          placeholder="password"
          label="Password"
          {...register("password")}
        />
        <button className={style.btm} type="submit">
          Cadastrar
        </button>
      </form>
      <ToastContainer
        className="toast"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
