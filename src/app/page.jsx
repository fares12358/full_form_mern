"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppContext } from "./Context";
import axios from "axios";

import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const { data: session, status } = useSession();

  const { user, setUser, isLoged, setisLoged } = useAppContext();

  const getUserData = async () => {
    try {

      const response = await axios.post(`${API_URL}/getUserData`, {
        identifier: session.user.email,
      });

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

  const logoutHandel = () => {
    signOut();
    setUser(null)
    setisLoged(false)
  }


  if (status === "loading") return <p>Loading...</p>;
  return (
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

      ) : (
        <Link href={"/pages/form/Login"} className="bg-black px-4 py-2 text-white">Login</Link>
      )}
    </div>
  );
}
