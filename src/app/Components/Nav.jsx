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
    <nav className='w-full h-[50px] flex items-center justify-between  py-16 px-5 container mx-auto relative'>
      <h1 className='text-3xl font-bold'>Comet</h1>

      <ul className="flex items-center justify-center gap-5 md:text-lg text-sm uppercase font-medium text-neutral-500 absolute md:static bottom-0 w-full">
        <li className='cursor-pointer hover:text-black'>home</li>
        <li className='cursor-pointer hover:text-black'>men</li>
        <li className='cursor-pointer hover:text-black'>women</li>
        <li className='cursor-pointer hover:text-black'>kids</li>
      </ul>

      {
        session && session.user || user && isLoged ?
          <div className='flex items-center justify-center gap-5'>
            <Link href={"/pages/account2"} className='flex items-center justify-center gap-4'><Image src={"/svg/unknown-com.svg"} alt='home' width={35} height={35} /></Link>
            <Link href={"/pages/cart"}><Image src={"/svg/cart-.svg"} alt='cart' width={35} height={35}/></Link>
          </div>
          :
          <Link href={"/pages/form/Login"} className='bg-blue-600 py-1 px-4 text-white rounded-md uppercase'>login</Link>
      }

    </nav>
  )
}

export default Nav