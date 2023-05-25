"use client";

import Link from "next/link";
import InputComponent from "../Inputs";
import style from "./styles.module.scss";

export default function LoginFormComponent() {
  return (
    <form className={style.container}>
      <h1>KenzieContacts</h1>
      <div>
        <button>Login</button>
        <button>Cadastro</button>
      </div>
      <InputComponent
        type="email"
        name="email"
        placeholder="email"
        label="Email"
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
      <p>
        Ainda nao tem cadastro? clique <Link href={"/home"}>aqui</Link> e
        registre-se
      </p>
    </form>
  );
}
