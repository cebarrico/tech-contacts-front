"use client";

import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import { Login, User } from "@/schemas/user.schemas";
import { Contact } from "@/schemas/contacts.schemas";
import {
  phoneSchema,
  Phone,
  emailSchema,
  Email,
} from "@/schemas/phone-mail.schemas";
import { toast } from "react-toastify";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (data: Login) => Promise<void>;
  contacts: Contact[];
  load: boolean;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  phone: Phone[];
  setPhone: Dispatch<SetStateAction<Phone[]>>;
  email: Email[];
  setEmail: Dispatch<SetStateAction<Email[]>>;
}

export const AuthContext = createContext({} as IContextValue);

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [phone, setPhone] = useState<Phone[]>([]);
  const [email, setEmail] = useState<Email[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jwtToken = localStorage.getItem("@TOKEN");
        if (!jwtToken) {
          return;
        }
        const token: any = jwt_decode(jwtToken);
        const response = await api.get(`users/${token.sub}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (data: Login) => {
    try {
      const response = await api.post("auth", data);
      const token: any = jwt_decode(response.data.token);
      const findUser = await api.get(`users/${token.sub}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      localStorage.setItem("@TOKEN", response.data.token);

      setUser(findUser.data);

      router.push("/home");
    } catch (error) {
      console.error(error);
      toast.error(`Usuario ou senha invalidos`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        contacts,
        setContacts,
        load,
        phone,
        setPhone,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
