"use client"
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAppContext } from '../Context';

const Nav = () => {
  const { data: session, status } = useSession();
  const { user, setUser, isLoged, setisLoged } = useAppContext();

  const logoutHandel = () => {
    signOut();
    setUser(null)
    setisLoged(false)
  }
  return (
    <nav className='w-full h-[50px] flex items-center justify-between  py-10 pb-16 lg:pb-10 px-5 container mx-auto relative'>
      <h1 className='text-xl font-bold text-[#B6349A]'>EasyMart</h1>

      <ul className="flex items-center justify-center gap-5 md:text-md text-sm uppercase font-medium text-neutral-500 absolute md:static bottom-0 w-fit   left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-x-0 md:-translate-y-0 ">
        <Link className='cursor-pointer hover:text-black' href={"/"}>home</Link>
        <li className='cursor-pointer hover:text-black'>men</li>
        <li className='cursor-pointer hover:text-black'>women</li>
        <li className='cursor-pointer hover:text-black'>kids</li>
      </ul>

      {
        session && session.user || user && isLoged ?
          <div className='flex items-center justify-center gap-2 lg:gap-5 w-fit'>
            <Link href={"/pages/account2"} className='flex items-center justify-center gap-4 w-fit h-fit'><img src={user?.image || "/svg/unknown-com.svg"} alt='home' fill="true"  className='rounded-full w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] ' /></Link>
            <Link href={"/pages/cart"} className='flex items-center justify-center gap-2 text-[14px] px-2 py-2 lg:px-2 lg:py-2 rounded-[39px] bg-[#FDEAFB] font-medium'>
            <div className="flex items-center justify-center text-xs bg-white p-1 rounded-2xl w-fit text-[#B6349A] font-bold">
              <Image src={"/svg/cart-.svg"} alt='cart' width={20} height={20} />
              20
            </div>
              Cart
            </Link>
          </div>
          :
          <Link href={"/pages/form/Login"} className='bg-blue-600 py-2 px-4 text-white rounded-md uppercase'>login</Link>
      }

    </nav>
  )
}

export default Nav