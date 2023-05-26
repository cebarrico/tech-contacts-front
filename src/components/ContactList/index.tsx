import { Contact } from "@/schemas/contacts.schemas";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthContext";
interface ContactArray {
  contacts: Contact[];
}
export default function ContactList() {
  const { contacts } = useContext(AuthContext);
  // return (
  //   <>
  //     {array?.map((contact) => {
  //       <li key={contact.id}>
  //         <h3>{contact.first_name}</h3>
  //         <h3>{contact.last_name}</h3>
  //         <span>{contact.main_email}</span>
  //         <span>{contact.main_phone}</span>
  //       </li>;
  //     })}
  //   </>
  // );
  return contacts?.map((contact) => {
    return (
      <li key={contact.id}>
        <h3>{contact.first_name}</h3>
        <h3>{contact.last_name}</h3>
        <span>{contact.main_email}</span>
        <span>{contact.main_phone}</span>
      </li>
    );
  });
}
