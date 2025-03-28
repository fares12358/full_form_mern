"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppContext } from "./Context";
import axios from "axios";

import { useEffect } from "react";
import Loader from "./Components/Loader";
import Nav from "./Components/Nav";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const token = 'f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'

export default function Home() {
  const { data: session, status } = useSession();

  const { user, setUser, isLoged, setisLoged } = useAppContext();

  const getUserData = async () => {
    try {
      const response = await axios.post(`${API_URL}/getUserData`, {
        identifier: session.user.email,
      },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
<<<<<<< HEAD
=======

>>>>>>> 75a44478f9bb18d179930d8d031cbb51a63c9256
      if (response.status !== 200) {
        console.error("Failed to save user data to backend:", response.data);
        return false; // Block login if backend fails
      }
      setUser(response.data);
    } catch (error) {
      console.log("Error storing user:", error.response?.data || error.message);
    }
  }
  useEffect(() => {
    if (status && session) {
      setisLoged(true);
      getUserData();
    }
  }, [status])

  // session && session.user || user && isLoged ?
  if (status === "loading") return <Loader />;
  return (
<<<<<<< HEAD
    <div className="flex flex-col w-full h-full">
      <Nav />
      <div className="flex flex-col items-center justify-center gap-2  p-10 h-full overflow-y-auto">
=======
    <div className="flex items-center justify-center w-full h-full">
      {session && session.user || user && isLoged ? (
        <div className="flex flex-col items-center justify-center gap-2  p-10 border">
          <h2>Welcome, {session?.user?.name || user?.name} </h2>
          <p>Email: {session?.user?.email || user?.email || "none"}</p>
          <img src={session?.user?.image || user?.image || 'none'} alt="User Image" width={100} height={100} />
          <button className="bg-blue-600 py-2 px-5 text-white font-bold rounded-md" onClick={logoutHandel}>Sign Out</button>
          <Link href={"/pages/dashboard"} className="bg-green-600 py-2 px-5 text-white font-bold rounded-md">Dashboard</Link>
          <Link href={"/pages/account"} className="bg-fuchsia-600 py-2 px-5 text-white font-bold rounded-md">Account</Link>
          <div className="bg-red-600 py-2 px-5 text-white font-bold rounded-md cursor-pointer"
            onClick={() => console.log(user)}>show user</div>

        </div>
>>>>>>> 75a44478f9bb18d179930d8d031cbb51a63c9256

      </div>
    </div>
  );
}
