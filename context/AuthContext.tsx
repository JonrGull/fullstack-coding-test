import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../config/firebase/firebase";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
const { Provider } = AuthContext;

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    return;
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    return;
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    return;
  };

  return <Provider value={{ user, login, signUp, logout }}>{loading ? null : children}</Provider>;
};
