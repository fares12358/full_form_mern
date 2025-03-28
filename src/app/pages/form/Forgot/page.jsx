'use client'
import Loader from '@/app/Components/Loader';
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token='f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'

  const [formData, setformData] = useState({ username: ''})
  const [errors, setErrors] = useState({ username: '', forgot: '' });
  const [loader, setloader] = useState(false)

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

  const ForgotpassHandel = (e) => {
    e.preventDefault();
    // Call validation functions with proper event objects
    const usernameValid = usernameValidation({ target: { value: formData.username } });
    if (usernameValid) {
      ForgotpassBackend();
    }
  };

  const ForgotpassBackend = async () => {
    try {
      setloader(true);
      const res = await axios.post(`${API_URL}/forgot-password`, {
        identifier: formData.username,
      },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200 ) {
        setErrors({forgot:res.data.message})
        setformData({ username: '' });
        setTimeout(() => {
          setformData({ username: ''});
          setErrors({ username: '',forgot: '' });
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          setErrors((prev) => ({ ...prev, forgot: 'User not found' }));
        } else {
          setErrors((prev) => ({ ...prev, forgot: data.message || 'An unexpected error occurred' }));
        }
        setTimeout(() => {
          setErrors((prev) => ({ ...prev, forgot: '' }));
        }, 3000);

      } else {
        // Network or other unexpected errors
        setErrors((prev) => ({ ...prev, forgot: 'Network error. Please check your connection.' }));
        setTimeout(() => {
          setErrors((prev) => ({ ...prev, forgot: '' }));
        }, 3000);
      }

      console.log('Error get password:', error.response?.data || error.message);
    } finally {
      setloader(false);
    }
  };

  return (
    loader ?
      <Loader />
      :
      <div className='w-full h-full flex items-center justify-center'>
        <form action="" className=' w-[600px] max-w-[80%] h-full flex flex-col items-center justify-center gap-5'>
          <h2 className='uppercase text-2xl md:text-4xl font-bold'>Forgot password</h2>
          <p>Got your password ? <Link href={"/pages/form/Login"} className='text-blue-600 uppercase font-bold'>Login</Link></p>
          {
            errors.forgot === "" ?
              ''
              :
              <p className='text-green-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.forgot}</p>
          }
          {
            errors.username === "" ?
              ''
              :
              <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.username}</p>
          }
          <input type="text" value={formData.username} onChange={(e) => usernameValidation(e)} className='border border-neutral-500 outline-none focus:border-blue-600 focus:outline-none max-w-full w-[400px] py-2 px-4 text-md' placeholder='Username or Email' />
         

          <button className='bg-blue-600 text-white p-5 py-3 rounded-sm w-[400px] max-w-full uppercase font-bold' onClick={ForgotpassHandel}>get password</button>
        </form>

      </div>
  )
}

export default page