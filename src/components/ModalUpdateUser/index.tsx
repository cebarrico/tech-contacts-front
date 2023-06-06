import style from "./styles.module.scss";
import { api } from "@/services/api";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthContext";
import InputComponent from "../Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, updateUserSchema } from "@/schemas/user.schemas";
import MiniEmailForm from "./EmailForm";
import MiniPhoneForm from "./PhoneForm";

export function ModalUpdateUser({ setIsOpenUser }: any) {
  const { email, phone, setEmail, setPhone, user, setUser } =
    useContext(AuthContext);
  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    const getMailsandPhones = async () => {
      if (!user) {
        setIsOpenUser(false);
        return;
      }
      const responsePhone = await api.get(`phone/owner/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPhone(responsePhone.data);

      const responseMail = await api.get(`email/owner/${user.id}`, {
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
  } = useForm<User>({
    resolver: zodResolver(updateUserSchema),
  });

  async function onSubimit(data: User) {
    try {
      const response = await api.patch(`users/${user?.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setUser(response.data);
      setIsOpenUser(false);
    } catch (error) {
      console.error(error);
    }
  }
  if (!user) {
    return <></>;
  }
  return (
    <div className={style.container}>
      <div className={style.modalContainer}>
        <form
          className={style.containerMainForm}
          onSubmit={handleSubmit(onSubimit)}
        >
          <div className={style.modalHeader}>
            <h2>{user?.first_name}</h2>
            <button onClick={() => setIsOpenUser(false)}>X</button>
          </div>
          <InputComponent
            defaultValue={user.first_name}
            type="text"
            placeholder={user.first_name}
            label="Nome"
            {...register("first_name")}
          />
          <InputComponent
            defaultValue={user.last_name}
            type="text"
            placeholder={user.last_name}
            label="Sobrenome"
            {...register("last_name")}
          />
          <InputComponent
            defaultValue={user.main_email}
            type="email"
            placeholder={user.main_email}
            label="Email"
            {...register("main_email")}
          />
          <InputComponent
            defaultValue={user.main_phone}
            type="text"
            placeholder={user.main_phone}
            label="Telefone"
            {...register("main_phone")}
          />
          <button className={style.btm} type="submit">
            Atualizar
          </button>
        </form>
        <div className={style.extraContainer}>
          <ul className={style.modalList}>
            <MiniEmailForm userId={user.id} />
            {email.map((email) => {
              return (
                <li key={email.id}>
                  <span>{email.email}</span>
                </li>
              );
            })}
          </ul>
          <ul className={style.modalList}>
            <MiniPhoneForm userId={user.id} />
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
