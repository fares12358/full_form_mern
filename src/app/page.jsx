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
    <div className="flex flex-col w-full h-[calc(100%-104px)] lg:h-[calc(100%-80px)] ">
      <div className="flex flex-col items-center justify-center gap-2  p-10 h-full overflow-y-auto">

      </div>
    </div>
  );
}
