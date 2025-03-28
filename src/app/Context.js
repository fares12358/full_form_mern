"use client"
// context/AppContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoged, setisLoged] = useState(false);
  const [isLogedDash, setisLogedDash] = useState(false);
<<<<<<< HEAD
  const [menuAccView, setMenuAccView] = useState(false);
  return (
    <AppContext.Provider value={{ user, setUser,isLoged, setisLoged,isLogedDash, setisLogedDash,menuAccView, setMenuAccView}}>
=======
  return (
    <AppContext.Provider value={{ user, setUser,isLoged, setisLoged,isLogedDash, setisLogedDash}}>
>>>>>>> 75a44478f9bb18d179930d8d031cbb51a63c9256
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
