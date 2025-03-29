"use client";
import Loader from '@/app/Components/Loader';
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token='f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'

    const [passType, setpassType] = useState('password')
    const [formData, setformData] = useState({ username: '', password: '', name: '', confirm: '', email: '' })
    const [errors, setErrors] = useState({ username: '', password: '', name: '', confirm: '', register: '', email: '' });
    const [loader, setloader] = useState(false)

    const nameValidation = (e) => {
        const newName = e.target.value;

        setformData((prevData) => ({ ...prevData, name: newName }));

        if (!newName.trim()) {
            setErrors((prev) => ({ ...prev, name: 'Name cannot be empty' }));
            return false;
        }

        if (!/^[A-Za-z\s]+$/.test(newName)) {
            setErrors((prev) => ({ ...prev, name: 'Name must contain only letters' }));
            return false;
        }

        setErrors((prev) => ({ ...prev, name: '' }));
        return true;
    };

    const usernameValidation = (e) => {
        const newUserName = e.target.value;

        setformData((prevData) => ({ ...prevData, username: newUserName }));

        if (!newUserName.trim()) {
            setErrors((prev) => ({ ...prev, username: 'Username cannot be empty' }));
            return false;
        }

        if (newUserName.length < 6) {
            setErrors((prev) => ({ ...prev, username: 'Username must be at least 6 characters long' }));
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

        if (newPassword.length < 6) {
            setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
            return false;
        }

        setErrors((prev) => ({ ...prev, password: '' }));
        return true;
    }

    const confirmPasswordValidation = (e) => {
        const newConfirm = e.target.value;

        setformData((prevData) => ({ ...prevData, confirm: newConfirm }));

        if (!newConfirm.trim()) {
            setErrors((prev) => ({ ...prev, confirm: 'Confirm Password cannot be empty' }));
            return false;
        }

        if (newConfirm !== formData.password) {
            setErrors((prev) => ({ ...prev, confirm: 'Confirm Password does not match' }));
            return false;
        }

        setErrors((prev) => ({ ...prev, confirm: '' }));
        return true;

    }
    const emailValidation = (e) => {
        const newEmail = e.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setformData((prevData) => ({ ...prevData, email: newEmail }));

        if (!newEmail.trim()) {
            setErrors((prev) => ({ ...prev, email: 'Email cannot be empty' }));
            return false;
        }


        if (!emailPattern.test(newEmail)) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
            return false;
        }

        setErrors((prev) => ({ ...prev, email: '' }));
        return true;
    }
    const register = (e) => {
        e.preventDefault();
        // Call validation functions with proper event objects
        const nameValid = nameValidation({ target: { value: formData.name } });
        const usernameValid = usernameValidation({ target: { value: formData.username } });
        const passwordValid = passwordValidation({ target: { value: formData.password } });
        const confirmValid = confirmPasswordValidation({ target: { value: formData.confirm } });
        const emailValid = emailValidation({ target: { value: formData.email } });
        if (nameValid && usernameValid && passwordValid && confirmValid && emailValid) {
            registerBackend();
        }

    };

    const registerBackend = async () => {
        try {
            setloader(true);
            const res = await axios.post(`${API_URL}/CreateAcc`, {
                name: formData.name,
                username: formData.username,
                password: formData.password,
                email: formData.email,
            },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            });

            if (res.status === 201) {
                console.log('Account created successfully:', res.data);
                setErrors((prev) => ({ ...prev, register: res.data.message }));
                setformData({ name: '', username: '', password: '', confirm: '', email: '' });
                setTimeout(() => {
                    setErrors({ username: '', password: '', name: '', confirm: '', register: '', email: '' });
                }, 3000);
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 400) {
                    setErrors((prev) => ({ ...prev, register: data.message }));
                } else if (status === 422) {
                    setErrors((prev) => ({ ...prev, register: data.message || 'Invalid input data' }));
                } else if (status === 500) {
                    setErrors((prev) => ({ ...prev, register: 'Server error. Please try again later.' }));
                } else {
                    setErrors((prev) => ({ ...prev, register: data.message || 'An unexpected error occurred' }));
                }
                setTimeout(() => {
                    setErrors((prev) => ({ ...prev, register: '' }));
                }, 3000);

            } else {
                // Network or other unexpected errors
                setErrors((prev) => ({ ...prev, register: 'Network error. Please check your connection.' }));
                setTimeout(() => {
                    setErrors((prev) => ({ ...prev, register: '' }));
                }, 3000);

            }

            console.log('Error creating account:', error.response?.data || error.message);
        } finally {
            setloader(false);
        }
    };




    return (
        loader ?
            <Loader />
            :
            <div className='w-full h-[calc(100%-104px)] lg:h-[calc(100%-80px)]  flex items-center justify-center'>
                <form action="" className=' w-[600px] max-w-[80%] h-full flex flex-col items-center justify-start gap-5 overflow-x-auto py-5 md:py-0'>
                    <h2 className='uppercase text-3xl md:text-4xl font-bold'>Sign up</h2>
                    <p>Already have an account ? <Link href={"/pages/form/Login"} className='text-blue-600 uppercase font-bold'>Login</Link></p>
                    {
                        errors.register === 'Username already exists' || errors.register === 'Email already exists' ?
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.register}</p>
                            :
                            <p className='text-green-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.register}</p>
                    }

                    {
                        errors.name === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.name}</p>
                    }
                    <input type="text" value={formData.name} onChange={(e) => nameValidation(e)} className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Name' />

                    {
                        errors.email === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.email}</p>
                    }

                    <input type="email" value={formData.email} onChange={(e) => emailValidation(e)} placeholder='Email' className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' />
                    {
                        errors.username === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.username}</p>
                    }
                    <input type="text" value={formData.username} onChange={(e) => usernameValidation(e)} className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Username' />
                    {
                        errors.password === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.password}</p>
                    }
                    <div className="max-w-full w-[400px] relative">

                        <input type={passType} value={formData.password} onChange={(e) => passwordValidation(e)} className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Password' />

                        {
                            passType == 'password' ?
                                <img src={`/svg/eye-hidden.svg`} className='w-[25px] p-[2px] absolute right-2 top-[12px] cursor-pointer' alt="eye" onClick={() => setpassType("text")} />
                                :
                                <img src={`/svg/eye-.svg`} className='w-[25px] p-[2px] absolute right-2 top-[12px] cursor-pointer' alt="eye" onClick={() => setpassType("password")} />
                        }
                    </div>
                    {
                        errors.confirm === "" ?
                            ''
                            :
                            <p className='text-red-600 font-medium text-start w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.confirm}</p>
                    }

                    <input type={passType} value={formData.confirm} onChange={(e) => confirmPasswordValidation(e)} className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-3 px-4 text-md' placeholder='Password' />

                    <button className='bg-blue-600 text-white p-5 py-3 rounded-sm w-[400px] max-w-full uppercase font-bold' onClick={register}>sign up</button>
                </form>

            </div>
    )
}

export default page