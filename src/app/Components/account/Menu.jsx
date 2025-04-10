"use client";
import { useAppContext } from "@/app/Context";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Menu = () => {
    const { user, setUser, menuAccView, setMenuAccView, setisLoged, accPage, setAccPage } = useAppContext();
    const router = useRouter();

    const logoutHandler = async () => {
        await signOut({ redirect: false });
        setUser(null);
        setisLoged(false);
        router.push("/");
    };

    return (
        <div
            className={`w-[200px] lg:w-[300px] h-full flex flex-col items-center justify-start rounded-2xl p-5 shadow-xl bg-white max-h-[100%]
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
                <h3 className="text-[#B6349A] font-bold lg:text-[15px] text-[13px]">{user?.name || "Name"}</h3>
            </div>

            <div className="bg-gray-300 w-full h-[1px] mt-5"></div>

            <div className="flex flex-col w-full h-full mt-5 overflow-auto">
                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(1) }}
                >
                    <img src="/svg/account-com.svg" alt="account" className="w-[20] h-[20px] " />
                    Account Details
                </div>
                {
                    user && user.role === "admin" ?
                        <Link href="/pages/dashboard"
                            className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                            onClick={() => setMenuAccView(false)}
                        >
                            <img src="/svg/admin-com.svg" alt="account" className="w-[20px] h-[20px] " />
                            Dashboard
                        </Link>
                        :
                        ''
                }

                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(2) }}
                >
                    <img src="/svg/cart-.svg" alt="account" className="w-[20px] h-[20px] " />
                    Cart
                </div>


                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(3) }}
                >
                    <img src="/svg/order-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    Orders
                </div>

                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(4) }}
                >
                    <img src="/svg/location-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    My Adresses
                </div>

                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(5) }}
                >
                    <img src="/svg/payment-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    My Payments
                </div>


                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(6) }}
                >
                    <img src="/svg/discount-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    Coupons
                </div>

                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(7) }}
                >
                    <img src="/svg/setting-com copy.svg" alt="account" className="w-[20px] h-[20px] " />
                    Settings
                </div>

                <div
                    className="flex items-center py-3 gap-2 text-[10px] md:text-[14px] font-extralight text-gray-500 cursor-pointer"
                    onClick={() => { setMenuAccView(false); setAccPage(8) }}
                >
                    <img src="/svg/discount-com.svg" alt="account" className="w-[20px] h-[20px] " />
                    Help Center
                </div>


            </div>

            <div className="bg-gray-300 w-full h-[1px] my-2"></div>

            <button
                onClick={logoutHandler}
                className="flex items-center justify-center gap-1 mt-auto mb-0 text-[10px] md:text-[14px] text-red-500 font-bold"
            >
                <img src="/svg/logout-com.svg" alt="logout" className="md:w-[30px] w-[16px]" />
                Logout
            </button>
        </div>
    );
};

export default Menu;
