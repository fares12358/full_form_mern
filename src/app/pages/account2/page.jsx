'use client';
import AccDetails from '@/app/Components/account/AccDetails'
import Menu from '@/app/Components/account/Menu'
import { useAppContext } from '@/app/Context';
import React from 'react'

const page = () => {
  const { user, setUser, isLoged,menuAccView, setMenuAccView } = useAppContext();
  
  return (
    <div className="h-[calc(100%-104px)] lg:h-[calc(100%-80px)] w-full flex items-center justify-start gap-5 p-3">
      <Menu/>
      <div className="w-full h-full p-2 pt-0 flex flex-col rounded-2xl shadow-xl bg-white absolute mt-[110px] lg:mt-0  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0  lg:static">
      <img src="/svg/menu-com copy.svg" alt="menu" className='w-[35px] cursor-pointer z-50 block lg:hidden' onClick={()=>{setMenuAccView(true)}} />
      <AccDetails/>
      </div>
    </div>
  )
}

export default page