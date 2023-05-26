"use client";
import { api } from "@/services/api";
import Link from "next/link";
import InputComponent from "../Inputs";
import style from "./styles.module.scss";

export default function RegisterFormComponent() {
  return (
    <form className={style.container}>
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
        name="first_name"
        placeholder="nome"
        label="Nome"
      />{" "}
      <InputComponent
        type="text"
        name="last_name"
        placeholder="sobrenome"
        label="Sobrenome"
      />
      <InputComponent
        type="email"
        name="main_email"
        placeholder="email"
        label="Email"
      />
      <InputComponent
        type="text"
        name="main_phone"
        placeholder="telefone"
        label="Telefone"
      />
      <InputComponent
        type="password"
        name="password"
        placeholder="password"
        label="Password"
      />
      <button className={style.btm} type="submit">
        Logar
      </button>
    </form>
  );
}
