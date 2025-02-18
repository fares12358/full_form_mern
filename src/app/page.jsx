"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppContext } from "./Context";
import axios from "axios";

import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const { data: session, status } = useSession();

  const { user, setUser } = useAppContext();

  const getUserId = async () => {
    try {
      let veriftion = false
      if (status) {
        veriftion = true
      }
      const response = await axios.post(`${API_URL}/getUserData`, {
        email: session.user.email,
        isVr: veriftion
      });

      if (response.status !== 200) {
        console.error("Failed to save user data to backend:", response.data);
        return false; // Block login if backend fails
      }
      console.log(response.data);
      setUser(response.data);

    } catch (error) {
      console.log("Error storing user:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    if (status && session) {
      getUserId();
    }
  }, [status])



  if (status === "loading") return <p>Loading...</p>;
  return (
    <div className="flex items-center justify-center w-full h-full">
      {session && session.user || user ? (
        <div className="flex flex-col items-center justify-center gap-2  p-10 border">
          <h2>Welcome, {session?.user?.name || user?.name} </h2>
          <p>Email: {session?.user?.email || user?.email || "none"}</p>
          <img src={session?.user?.image || user?.image || 'none'} alt="User Image" width={100} height={100} />
          <button className="bg-blue-600 py-2 px-5 text-white font-bold rounded-md" onClick={() => { signOut(); setUser(null) }}>Sign Out</button>
          <div className="bg-red-600 py-2 px-5 text-white font-bold rounded-md cursor-pointer"
            onClick={() => console.log(user)}>show user</div>

          {user && typeof user === "object" && !Array.isArray(user) ? (
            <div>
              <div className="text-green-600 uppercase ">user data</div>
              <div>{user._id}</div>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.username}</div>
              <div>{user.password}</div>
              <div>{user.verification}</div>
              <div>{user.image}</div>
            </div>
          ): (
            <div>user is empty</div>
          )}

        </div>

      ) : (
        <Link href={"/pages/form/Login"} className="bg-black px-4 py-2 text-white">Login</Link>
      )}
    </div>
  );
}
