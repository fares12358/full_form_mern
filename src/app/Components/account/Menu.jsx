"use client";
import { useAppContext } from "@/app/Context";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Menu = () => {
    const { user, setUser, menuAccView, setMenuAccView, setisLoged } = useAppContext();
    const router = useRouter();

    const logoutHandler = async () => {
        await signOut({ redirect: false });
        setUser(null);
        setisLoged(false);
        router.push("/");
    };

    return (
        <div
            className={`w-[300px] h-full flex flex-col items-center justify-start rounded-2xl p-5 shadow-xl bg-white 
            transform transition-transform duration-300 z-40 
            ${menuAccView ? "translate-x-0" : "-translate-x-[150%]"} lg:translate-x-0`}
        >
            {/* Close button (only visible on mobile) */}
            <img
                src="/svg/close-com copy.svg"
                alt="menu"
                className="w-[30px] cursor-pointer z-50 self-end block lg:hidden"
                onClick={() => setMenuAccView(false)}
            />

            {/* User Info */}
            <div className="flex items-center gap-3 w-full">
                <img
                    src={user?.image || "/svg/unknown-com.svg"}
                    alt="person"
                    className="w-[48px] h-[48px] rounded-full"
                />
                <h3 className="text-black font-medium text-[15px]">{user?.name || "Name"}</h3>
            </div>

            {/* Divider */}
            <div className="bg-gray-400 w-full h-[1px] mt-5"></div>

            {/* Menu Items */}
            <div className="flex flex-col w-full h-full mt-5 overflow-auto">
                <div
                    className="flex py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => setMenuAccView(false)}
                >
                    <img src="/svg/account-com.svg" alt="account" className="w-[20px] h-[20px]" />
                    Account Details
                </div>

                <Link href="/pages/dashboard">
                    <div
                        className="flex py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer"
                        onClick={() => setMenuAccView(false)}
                    >
                        <img src="/svg/account-com.svg" alt="account" className="w-[20px] h-[20px]" />
                        Dashboard
                    </div>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={logoutHandler}
                    className="py-3 flex items-center justify-center gap-1 mt-auto mb-0 text-red-500 font-bold"
                >
                    <img src="/svg/logout-com.svg" alt="logout" className="w-[30px]" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Menu;
