"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import Loader from '@/app/Components/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/Context';
const page = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token='f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'

    const [formData, setformData] = useState({ username: 'fares123', password: 'fares123' })
    const [errors, setErrors] = useState({ username: '', password: '', login: '' });
    const [loader, setloader] = useState(false)
    const [passType, setpassType] = useState('password');
    const { data: session } = useSession();
    const { setUser,setisLoged } = useAppContext();
    const router = useRouter();

    const usernameValidation = (e) => {
        const newUserName = e.target.value;

        setformData((prevData) => ({ ...prevData, username: newUserName }));

        if (!newUserName.trim()) {
            setErrors((prev) => ({ ...prev, username: 'Username cannot be empty' }));
            return false;
        }
        setErrors((prev) => ({ ...prev, username: '' }));
        return true;
    }

    const passwordValidation = (e) => {
        const newPassword = e.target.value;

        setformData((prevData) => ({ ...prevData, password: newPassword }));

        if (!newPassword.trim()) {
            setErrors((prev) => ({ ...prev, password: 'Password cannot be empty' }));
            return false;
        }

        setErrors((prev) => ({ ...prev, password: '' }));
        return true;
    }

    const Login = (e) => {
        e.preventDefault();

        // Call validation functions with proper event objects
        const usernameValid = usernameValidation({ target: { value: formData.username } });
        const passwordValid = passwordValidation({ target: { value: formData.password } });


        if (usernameValid && passwordValid) {
            loginBackend();

        }

    };

    const loginBackend = async () => {
        try {
            setloader(true);
            const res = await axios.post(`${API_URL}/Login`, {
                username: formData.username,
                password: formData.password,
            },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            });

            if (res.status === 200 && res.data.login) {
                setUser(res.data.user);
                setisLoged(true);
                router.push("/");
                setformData({ username: '', password: '' });
                setTimeout(() => {
                    setErrors({ username: '', password: '', login: '' });
                }, 3000);
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 404) {
                    setErrors((prev) => ({ ...prev, login: 'User not found' }));
                } else if (status === 401) {
                    setErrors((prev) => ({ ...prev, login: 'Invalid password or username' }));
                } else {
                    setErrors((prev) => ({ ...prev, login: data.message || 'An unexpected error occurred' }));
                }
                setTimeout(() => {
                    setErrors((prev) => ({ ...prev, login: '' }));
                }, 3000);

            } else {
                // Network or other unexpected errors
                setErrors((prev) => ({ ...prev, login: 'Network error. Please check your connection.' }));
                setTimeout(() => {
                    setErrors((prev) => ({ ...prev, login: '' }));
                }, 3000);
            }

            console.log('Error login account:', error.response?.data || error.message);
        } finally {
            setloader(false);
        }
    };



    return (
        loader ?
            <Loader />
            :
            <div className='w-full h-[calc(100%-104px)] lg:h-[calc(100%-80px)] flex items-center justify-center'>
                <form action="" className=' w-[600px] max-w-[80%] h-full flex flex-col items-center justify-center gap-5'>
                    <h2 className='uppercase text-3xl md:text-4xl font-bold'>login</h2>
                    <p>Don't have an account ? <Link href={"/pages/form/Register"} className='text-[#B6349A] uppercase font-bold'>sign up</Link></p>
                    {
                        errors.login === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.login}</p>
                    }
                    {
                        errors.username === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.username}</p>
                    }
                    <input type="text" value={formData.username} onChange={(e) => usernameValidation(e)} className='border border-neutral-500 outline-none focus:border-[#B6349A] focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Username' />
                    {
                        errors.password === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.password}</p>
                    }
                    <div className="max-w-full w-[400px] relative">
                        <input type={passType} value={formData.password} onChange={(e) => passwordValidation(e)} className='border border-neutral-500 outline-none focus:border-[#B6349A] focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Password' />

                        {
                            passType == 'password' ?
                                <img src={`/svg/eye-hidden.svg`} className='w-[25px] p-[2px] absolute right-2 top-[12px] cursor-pointer' alt="eye" onClick={() => setpassType("text")} />
                                :
                                <img src={`/svg/eye-.svg`} className='w-[25px] p-[2px] absolute right-2 top-[12px] cursor-pointer' alt="eye" onClick={() => setpassType("password")} />
                        }
                    </div>

                    <Link href={"/pages/form/Forgot"} className='text-[#B6349A] font-bold'>Forgot password?</Link>
                    <button className='bg-[#B6349A] text-white p-5 py-3 rounded-sm w-[400px] max-w-full uppercase font-bold' onClick={Login}>login</button>

                    <button className='border border-[#B6349A] flex items-center justify-center px-5 py-3 rounded-sm gap-1 w-[400px] max-w-full'
                        onClick={(e) => { e.preventDefault(); signIn("google", { callbackUrl: "/" }) }}>
                        <img src="/svg/google.svg" alt="google" className='w-[25px] h-[25px]' />
                        Login with google
                    </button>
                </form>

            </div>
    )
}

export default page