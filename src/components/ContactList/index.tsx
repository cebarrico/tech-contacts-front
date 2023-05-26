import { api } from "@/services/api";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { Contact } from "@/schemas/contacts.schemas";
import { FaTrash } from "react-icons/fa";

export default function ContactList({ ...props }) {
  const { setContacts } = useContext(AuthContext);

  async function deleteContact(id: string) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.delete(`contacts/${props.id}`, {
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
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <li key={props.key}>
      <div>
        <h3>{props.first_name}</h3>
        <h3>{props.last_name}</h3>
        <span>{props.main_email}</span>
        <span>{props.main_phone}</span>
      </div>
      <FaTrash onClick={() => deleteContact(props.id)} />
    </li>
  );
}
