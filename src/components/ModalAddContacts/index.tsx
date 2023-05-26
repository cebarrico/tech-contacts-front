import style from "./styles.module.scss";
import InputComponent from "../Inputs";

export function ModalAddContacts({ setIsOpen }: any) {
  function handleSubmit(data: any) {
    return data;
  }

  return (
    <div className={style.container}>
      <form className={style.container} onSubmit={handleSubmit("OI")}>
        <div className={style.modalHeader}>
          <h1>Adcionar Contato</h1>
          <button onClick={() => setIsOpen(false)}>X</button>
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
        <button className={style.btm} type="submit">
          Logar
        </button>
      </form>
    </div>
  );
}
