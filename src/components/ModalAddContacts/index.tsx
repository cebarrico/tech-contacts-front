import style from "./styles.module.scss";
import { api } from "@/services/api";
import InputComponent from "../Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, addContactSchema } from "@/schemas/contacts.schemas";
import { toast } from "react-toastify";

export function ModalAddContacts({ setIsOpen, setContacts }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(addContactSchema),
  });

  async function onSubimit(data: Contact) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.post("contacts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Contato adcionado com sucesso");
      setContacts((previousData: Contact[]) => [
        response.data,
        ...previousData,
      ]);
      setIsOpen(false);
    } catch (error: any) {
      console.error(error), toast.error(`${error.response.data.message}`);
    }
  }

  return (
    <div className={style.container}>
      <form className={style.container} onSubmit={handleSubmit(onSubimit)}>
        <div className={style.modalHeader}>
          <h1>Adcionar Contato</h1>
          <button onClick={() => setIsOpen(false)}>X</button>
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
        <button className={style.btm} type="submit">
          Adcionar
        </button>
      </form>
    </div>
  );
}
