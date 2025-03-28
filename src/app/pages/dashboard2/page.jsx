"use client"
import { useAppContext } from '@/app/Context';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewAccBtn, setviewAccBtn] = useState(false);
  const { user, isLoged } = useAppContext();

  const viewAccMn = () => {
    setviewAccBtn(!viewAccBtn)
  }
  return (


    <div className="w-full h-full bg-light1 flex gap-1 p-2 relative">

      {/* Sidebar */}
      <div className={`w-[250px] bg-light2 rounded-xl flex flex-col px-5 
        lg:relative lg:h-auto absolute top-0 left-0 h-full z-20 transition-transform duration-300 my-2 overflow-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-2xl`}>

        <img
          src="/svg/close-com.svg"
          alt="Close sidebar"
          className="w-[25px] absolute top-3 right-3 cursor-pointer lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`w-full ${viewAccBtn ? 'max-h-screen' : 'max-h-[40px]'} transition-transform duration-300 ease-in-out lg:mt-10 mt-16 overflow-hidden rounded-lg`}
          onClick={viewAccMn}
        >
          <div className="cursor-pointer p-2 w-full h-[40px] flex items-center justify-center gap-1 bg-black text-white font-bold ">
            <img src="/svg/chevron-up-com.svg" alt="arrow" className={`w-[25px] ${!viewAccBtn ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out `} />
            Dash Account</div>
          <div className="flex flex-col items-center justify-start p-2 gap-2">
            <button className="w-full py-2 mt-2 text-white font-bold rounded-md">Account</button>
            <button className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md font-bold">Sign Out</button>
          </div>
        </div>
        <div className="w-[80%] h-[1px] mt-8 mx-auto bg-black"></div>

        <div className="h-fit flex flex-col items-center justify-start gap-2 mt-5 text-black text-md font-bold pl-5">
          <button className='flex items-center justify-start w-full gap-2 h-[40px]'><img src="/svg/home-com.svg" alt="home" className='w-[20px]' /> Home</button>
          <button className='flex items-center justify-start w-full gap-2 h-[40px]'><img src="/svg/report-com.svg" alt="report" className='w-[20px]' />Report</button>
          <button className='flex items-center justify-start w-full gap-2 h-[40px]'><img src="/svg/setting-com.svg" alt="setting" className='w-[20px]' />Setting</button>
        </div>

        <Link href={'/'} className='text-black font-bold flex items-center justify-center w-full h-[40px] my-auto mb-10 gap-2'>
          <img src="/svg/earth-com.svg" alt="website" className='w-[25px]' /> Back to website</Link>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[calc(100%-250px)]rounded-xl relative overflow-auto my-2">
        <img
          src="/svg/menu-com.svg"
          alt="Open sidebar"
          className="w-[30px] absolute top-3 left-3 cursor-pointer lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />

      </div>

    </div>
  );
}

export default Page;
