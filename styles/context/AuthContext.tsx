import { auth } from "config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext } from "react";

const UserContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return <UserContext.Provider value={createUser}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return UserContext(UserContext);
};
