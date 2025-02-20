"use client"
// context/AppContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoged, setisLoged] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser,isLoged, setisLoged}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
