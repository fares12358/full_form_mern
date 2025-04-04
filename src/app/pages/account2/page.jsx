'use client';
import AccDetails from '@/app/Components/account/AccDetails';
import Addresses from '@/app/Components/account/Addresses';
import Cart from '@/app/Components/account/Cart';
import Menu from '@/app/Components/account/Menu';
import Orders from '@/app/Components/account/Orders';
import { useAppContext } from '@/app/Context';
import React from 'react';

const Page = () => {
  const { menuAccView, setMenuAccView, accPage, setAccPage } = useAppContext();

  return (
    <div className="h-[calc(100%-104px)] lg:h-[calc(100%-80px)] w-full flex items-center justify-start gap-5 p-3">
      <Menu />
      <div className="w-full h-full p-5 pt-0 flex flex-col rounded-2xl shadow-xl bg-white absolute mt-[80px] lg:mt-0 
                      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0  
                      lg:static overflow-auto max-h-[90vh]">
        <div className="relative w-fit h-fit lg:hidden flex items-center justify-center mt-2">
          <span className={`absolute ${menuAccView ? 'hidden' : 'animate-ping'} bg-[#f8bbeb] w-[25px] h-[25px] rounded-full`}></span>
          <img
            src="/svg/menu-com copy.svg"
            alt="menu"
            className="w-[35px] cursor-pointer z-50 block lg:hidden"
            onClick={() => setMenuAccView(true)}
          />
        </div>
        <div className="overflow-auto lg:max-h-[100vh] max-h-[80vh] h-full lg:p-3 pb-10 w-full">
          {
            accPage === 1 ?
              <AccDetails />
              :accPage === 2 ?
                <Cart />
                : accPage === 3 ?
                  <Orders />
                  : accPage === 4 ?
                    <Addresses />
                    : accPage === 5 ?
                      <AccDetails />
                      : accPage === 6 ?
                        <AccDetails />
                        : accPage === 7 ?
                          <AccDetails />
                          :
                          ""
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
