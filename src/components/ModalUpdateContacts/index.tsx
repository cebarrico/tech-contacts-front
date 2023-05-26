import style from "./styles.module.scss";
import { api } from "@/services/api";
import InputComponent from "../Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, updateContactSchema } from "@/schemas/contacts.schemas";

export function ModalUpdateContacts({
  setIsOpenContact,
  setContacts,
  actualContact,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    // resolver: zodResolver(updateContactSchema),
  });

  async function onSubimit(data: Contact) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.patch(`contacts/${actualContact.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((previousData: Contact[]) => [
        response.data,
        ...previousData,
      ]);
      setIsOpenContact(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.container}>
      <form className={style.container} onSubmit={handleSubmit(onSubimit)}>
        <div className={style.modalHeader}>
          <h2>{actualContact.first_name}</h2>
          <button onClick={() => setIsOpenContact(false)}>X</button>
        </div>
        <InputComponent
          type="text"
          placeholder={actualContact.first_name}
          label="Nome"
          {...register("first_name")}
        />
        <InputComponent
          type="text"
          placeholder={actualContact.last_name}
          label="Sobrenome"
          {...register("last_name")}
        />
        <InputComponent
          type="email"
          placeholder={actualContact.main_email}
          label="Email"
          {...register("main_email")}
        />
        <InputComponent
          type="text"
          placeholder={actualContact.main_phone}
          label="Telefone"
          {...register("main_phone")}
        />
        <button className={style.btm} type="submit">
          Adcionar
        </button>
      </form>
    </div>
  );
}
