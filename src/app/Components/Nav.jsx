"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAppContext } from '../Context';

const Nav = () => {
  const { data: session, status } = useSession();
  const { user, isLoged,  } = useAppContext();

  return (
    <nav className='w-full h-[50px] flex items-center justify-between  py-10 pb-16 lg:pb-10 px-5 container mx-auto relative'>
      <h1 className='text-xl font-bold text-[#B6349A]'>EasyMart</h1>

      <ul className="flex items-center justify-center gap-5 md:text-md text-sm uppercase font-medium text-neutral-500 absolute md:static bottom-0 w-fit   left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-x-0 md:-translate-y-0 ">
        <Link className='cursor-pointer hover:text-[#B6349A]' href={"/"}>home</Link>
        <li className='cursor-pointer hover:text-[#B6349A]'>men</li>
        <li className='cursor-pointer hover:text-[#B6349A]'>women</li>
        <li className='cursor-pointer hover:text-[#B6349A]'>kids</li>
      </ul>
      {
         session && session.user || user && isLoged?
          <div className='flex items-center justify-center gap-2 lg:gap-5 w-fit'>
            <Link href={"/pages/account2"} className='flex items-center justify-center gap-4 w-fit h-fit'><img src={user?.image || "/svg/unknown-com.svg"} alt='home' fill="true"  className='rounded-full w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] ' /></Link>
            <Link href={"/pages/cart"} className='flex items-center justify-center gap-2 text-[12px] px-2 py-1 lg:px-2 lg:py-2 rounded-[39px] bg-[#FDEAFB] font-medium text-black'>
            <div className="flex items-center justify-center text-[12px] bg-white p-1 rounded-2xl w-fit text-[#B6349A] font-bold">
              <Image src={"/svg/cart-.svg"} alt='cart' width={20} height={20} />
              20
            </div>
              Cart
            </Link>
          </div>
          :
          <Link href={"/pages/form/Login"} className='bg-[#B6349A] lg:py-2 lg:px-4 px-2 py-1 text-[12px] lg:text-md text-white rounded-md uppercase'>login</Link>
      }

    </nav>
  )
}

export default Nav