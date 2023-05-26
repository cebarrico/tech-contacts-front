"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthContext";
import ContactList from "@/components/ContactList";
import { ModalAddContacts } from "@/components/ModalAddContacts";

import style from "./styles.module.scss";

export default function Home() {
  const { user, contacts, load } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);
  const router = useRouter();
  function logout() {
    localStorage.clear();
    router.push("");
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("@TOKEN");

    if (!jwtToken) {
      localStorage.clear();
      router.push("");
    }

    // findUser();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (load) {
    return <p>load</p>;
  }
  return (
    <>
      {isOpen && <ModalAddContacts setIsOpen={setIsOpen} />}
      <header>
        <nav className={style.navContainer}>
          <div>
            <h1>{user?.first_name}</h1>
            <p>{user?.last_name}</p>
          </div>

          <span>{user?.main_email}</span>
          <span>{user?.main_phone}</span>

          <div>
            <button>A</button>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
      </header>
      <main>
        <section className={style.container}>
          <button className={style.addContact} onClick={() => setIsOpen(true)}>
            +
          </button>
          <ul className={style.contactsContainer}>
            <div className={style.columnsName}>
              <span>Nome</span>
              <span>Sobrenome</span>
              <span>Email</span>
              <span>Telefone</span>
            </div>
            <ContactList />
          </ul>
        </section>
      </main>
    </>
  );
}
