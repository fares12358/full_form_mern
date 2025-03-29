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
            className={`w-[200px] lg:w-[300px] h-full flex flex-col items-center justify-start rounded-2xl p-5 shadow-2xl bg-white max-h-[100%]
            transform transition-transform duration-300 z-40 
            ${menuAccView ? "translate-x-0" : "-translate-x-[150%]"} lg:translate-x-0`}
        >
            <img
                src="/svg/close-com copy.svg"
                alt="menu"
                className="w-[30px] cursor-pointer z-50 self-end block lg:hidden"
                onClick={() => setMenuAccView(false)}
            />

            <div className="flex items-center gap-3 w-full">
                <img
                    src={user?.image || "/svg/unknown-com.svg"}
                    alt="person"
                    className="lg:w-[48px] lg:h-[48px] w-[35px] h-[35px] rounded-full"
                />
                <h3 className="text-[#B6349A] font-medium lg:text-[15px] text-[13px]">{user?.name || "Name"}</h3>
            </div>

            <div className="bg-gray-300 w-full h-[1px] mt-5"></div>

            <div className="flex flex-col w-full h-full mt-5 overflow-auto">
                <div
                    className="flex items-center py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => setMenuAccView(false)}
                >
                    <img src="/svg/account-com.svg" alt="account" className="w-[20] h-[20px] " />
                    Account Details
                </div>

                <Link href="/pages/dashboard"
                    className="flex items-center py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => setMenuAccView(false)}
                >
                    <img src="/svg/admin-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    Dashboard
                </Link>

                <Link href="/pages/cart"
                    className="flex items-center py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => setMenuAccView(false)}
                >
                    <img src="/svg/cart-.svg" alt="account" className="w-[20px] h-[20px] " />
                    Cart
                </Link>

            </div>

            <div className="bg-gray-300 w-full h-[1px] my-2"></div>

            {/* Logout Button */}
            <button
                onClick={logoutHandler}
                className="flex items-center justify-center gap-1 mt-auto mb-0 text-red-500 font-bold"
            >
                <img src="/svg/logout-com.svg" alt="logout" className="md:w-[30px] w-[20px]" />
                Logout
            </button>
        </div>
    );
};

export default Menu;
