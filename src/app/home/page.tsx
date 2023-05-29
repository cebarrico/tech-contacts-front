"use client";
import { api } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthContext";
import ContactList from "@/components/ContactList";
import { Contact } from "@/schemas/contacts.schemas";
import { ModalAddContacts } from "@/components/ModalAddContacts";
import { ModalUpdateContacts } from "@/components/ModalUpdateContacts";
import { ModalUpdateUser } from "@/components/ModalUpdateUser";
import { BsFillPencilFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import style from "./styles.module.scss";

export default function Home() {
  const { user, contacts, setContacts, load } = useContext(AuthContext);
  const [actualContact, setActualContact] = useState<Contact>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  async function handleSetIsOpenContact(data: any) {
    const jwtToken = localStorage.getItem("@TOKEN");
    const contact = await api.get(`contacts/${data}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setActualContact(contact.data);
    setIsOpenContact(true);
  }

  const router = useRouter();
  function logout() {
    localStorage.clear();
    router.push("");
  }

  useEffect(() => {
    const getContacts = async () => {
      const jwtToken = localStorage.getItem("@TOKEN");
      if (!jwtToken) {
        localStorage.clear();
        router.push("");
      }
      const response = await api.get("contacts", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setContacts(response.data);
    };

    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsOpenContact]);

  if (load) {
    return <p>load</p>;
  }

  return (
    <>
      {isOpen && (
        <ModalAddContacts setIsOpen={setIsOpen} setContacts={setContacts} />
      )}
      {isOpenContact && (
        <ModalUpdateContacts
          setIsOpenContact={setIsOpenContact}
          setContacts={setContacts}
          setActualContact={setActualContact}
          actualContact={actualContact}
        />
      )}
      {isOpenUser && <ModalUpdateUser setIsOpenUser={setIsOpenUser} />}
      <header>
        <nav className={style.navContainer}>
          <div>
            <h1>{user?.first_name}</h1>
            <p>{user?.last_name}</p>
          </div>

          <span>{user?.main_email}</span>
          <span>{user?.main_phone}</span>

          <div>
            <BsFillPencilFill
              className={style.update}
              onClick={() => setIsOpenUser(true)}
            />
            <BiLogOut className={style.logout} onClick={logout} />
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
            {contacts.map((contact, index) => {
              return (
                <ContactList
                  handleSetIsOpenContact={handleSetIsOpenContact}
                  key={index}
                  id={contact.id}
                  first_name={contact.first_name}
                  last_name={contact.last_name}
                  main_email={contact.main_email}
                  main_phone={contact.main_phone}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
