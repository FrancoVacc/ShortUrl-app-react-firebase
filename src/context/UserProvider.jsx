import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe;
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logInUserGoogle = () => signInWithPopup(auth, googleProvider);

  const logOutUser = () => signOut(auth);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        logInUser,
        logOutUser,
        logInUserGoogle,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(userContext);
