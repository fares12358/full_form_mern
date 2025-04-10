'use client';
import AccDetails from '@/app/Components/account/AccDetails';
import Addresses from '@/app/Components/account/Addresses';
import Cart from '@/app/Components/account/Cart';
import Coupons from '@/app/Components/account/Coupons';
import Menu from '@/app/Components/account/Menu';
import Orders from '@/app/Components/account/Orders';
import PayMent from '@/app/Components/account/PayMent';
import { useAppContext } from '@/app/Context';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Page = ({ params }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;  // Now id is accessible
    const { isLoged, user, menuAccView, setMenuAccView, accPage, setAccPage } = useAppContext();

    const pageComponents = {
        1: <AccDetails />,
        2: <Cart />,
        3: <Orders />,
        4: <Addresses />,
        5: <PayMent />,
        6: <Coupons />,
        7: <AccDetails />,
        8: <AccDetails />
    };


    useEffect(() => {
        if (id !== null && id !== undefined && id !== 0 && id !== '0') {
            const numericId = Number(id);  // Convert to number
            if (!isNaN(numericId)) {  // Check if it's a valid number
                setAccPage(numericId);  // Set the numeric ID to accPage
            } else {
                console.error("Invalid ID: not a number");
            }
        }
    }, [id]);



    return (
        <div className="h-[calc(100%-104px)] lg:h-[calc(100%-80px)] w-full flex items-center justify-start gap-5 p-3">
            <Menu />
            <div className="w-full h-full p-5 pt-0 flex flex-col rounded-2xl shadow-xl bg-white absolute mt-[104px] lg:mt-0 
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
                <div className="overflow-auto lg:max-h-[100vh] max-h-[80vh] h-full lg:p-3 pb-16 w-full">
                    {
                        // user && isLoged
                        user && isLoged ? (
                            pageComponents[accPage] || null
                        ) : (
                            <div className="w-full h-full flex items-center justify-center gap-2">
                                Something went wrong, go back <Link href={"/"} className="text-[#B6349A] font-bold">Home</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;
