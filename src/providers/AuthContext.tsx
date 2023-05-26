"use client";

import { ReactNode, createContext, useState, useEffect } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import { Login, User } from "@/schemas/user.schemas";
import { Contact } from "@/schemas/contacts.schemas";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IContextValue {
  user: User | null;
  login: (data: Login) => Promise<void>;
  contacts: Contact[] | null;
  load: boolean;
}
export const AuthContext = createContext({} as IContextValue);

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[] | null>([]);

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
        setContacts(response.data.contacts);
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
      // localStorage.setItem("@ID", token.sub);
      setUser(findUser.data);
      setContacts(findUser.data.contacts);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, contacts, load }}>
      {children}
    </AuthContext.Provider>
  );
}
