"use client";
import { useAppContext } from '@/app/Context';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react'

const Menu = () => {
    const { user, setUser, isLoged, menuAccView, setMenuAccView, setisLoged } = useAppContext();

    const router = useRouter();

    const logoutHandel = async () => {
        await signOut({ redirect: false });
        setUser(null)
        setisLoged(false)
        router.push("/");
    }

    return (
        <div className={`w-[300px] h-full flex flex-col items-center justify-start rounded-2xl p-5 shadow-xl bg-white -translate-x-[150%] lg:-translate-x-0 ${menuAccView ? '-translate-x-0' : ''} z-20 transition-transform duration-300`}>
            <img src="/svg/close-com copy.svg" alt="menu" className='w-[30px] cursor-pointer z-50 self-end block lg:hidden ' onClick={() => { setMenuAccView(false) }} />
            <div className="flex items-center justify-start gap-3 h-fit w-full">
                <img src={user?.image || "/svg/unknown-com.svg"} alt="person" className='w-[48px] h-[48px] rounded-full' />
                <h3 className='text-black font-medium text-[15px] flex-wrap'>{user?.name || 'name'}</h3>
            </div>
            <div className='bg-gray-400 w-full h-[1px] mt-5'></div>
            <ul className="flex gap-1 flex-col w-full h-full mt-5 max-h-full overflow-auto">
                <li className='flex py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer' onClick={() => { setMenuAccView(false) }}><img src="/svg/account-com.svg" alt="account" className='w-[20px] h-[20px]' /> Acouunt Details</li>
                <Link href={"/pages/dashboard"} className='flex py-3 gap-2 text-[14px] font-extralight text-gray-500 cursor-pointer' onClick={() => { setMenuAccView(false) }}><img src="/svg/account-com.svg" alt="account" className='w-[20px] h-[20px]' /> Dashboard</Link>
                <button onClick={logoutHandel} className="py-3 flex items-center justify-center gap-1 mt-auto mb-0"><img src="/svg/logout-com.svg" alt="logout" className='w-[30px]' />logout</button>
            </ul>
        </div>
    )
}

export default Menu