import style from "./styles.module.scss";
import { api } from "@/services/api";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthContext";
import InputComponent from "../Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, updateContactSchema } from "@/schemas/contacts.schemas";
import MiniEmailForm from "./EmailForm";
import MiniPhoneForm from "./PhoneForm";

export function ModalUpdateContacts({
  setIsOpenContact,
  setContacts,
  actualContact,
}: any) {
  const { email, phone, setEmail, setPhone } = useContext(AuthContext);
  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    const getMailsandPhones = async () => {
      if (!actualContact) {
        setIsOpenContact(false);
        return;
      }
      const responsePhone = await api.get(`phone/owner/${actualContact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPhone(responsePhone.data);

      const responseMail = await api.get(`email/owner/${actualContact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmail(responseMail.data);
    };
    getMailsandPhones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMail = async (data: string) => {
    const response = await api.post(`email`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(updateContactSchema),
  });

  async function onSubimit(data: Contact) {
    try {
      const response = await api.patch(`contacts/${actualContact.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getResponse = await api.get("contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(getResponse.data);
      setIsOpenContact(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.modalContainer}>
        <form
          className={style.containerMainForm}
          onSubmit={handleSubmit(onSubimit)}
        >
          <div className={style.modalHeader}>
            <h2>{actualContact.first_name}</h2>
            <button onClick={() => setIsOpenContact(false)}>X</button>
          </div>
          <InputComponent
            defaultValue={actualContact.first_name}
            type="text"
            placeholder={actualContact.first_name}
            label="Nome"
            {...register("first_name")}
          />
          <InputComponent
            defaultValue={actualContact.last_name}
            type="text"
            placeholder={actualContact.last_name}
            label="Sobrenome"
            {...register("last_name")}
          />
          <InputComponent
            defaultValue={actualContact.main_email}
            type="email"
            placeholder={actualContact.main_email}
            label="Email"
            {...register("main_email")}
          />
          <InputComponent
            defaultValue={actualContact.main_phone}
            type="text"
            placeholder={actualContact.main_phone}
            label="Telefone"
            {...register("main_phone")}
          />
          <button className={style.btm} type="submit">
            Adcionar
          </button>
        </form>
        <div className={style.extraContainer}>
          <ul className={style.modalList}>
            <MiniEmailForm />
            {email.map((email) => {
              return (
                <li key={email.id}>
                  <span>{email.email}</span>
                </li>
              );
            })}
          </ul>
          <ul className={style.modalList}>
            <MiniPhoneForm />
            {phone.map((phone) => {
              return (
                <li key={phone.id}>
                  <span>{phone.phone}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
