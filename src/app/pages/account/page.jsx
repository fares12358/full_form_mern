"use client"
import Loader from '@/app/Components/Loader';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [editMode, setEditMode] = useState(false);
  const { user, setUser, isLoged } = useAppContext();
  const [formData, setformData] = useState({ username: '', password: '', name: '', confirm: '', email: '' })
  const [errors, setErrors] = useState({ username: '', password: '', name: '', confirm: '', update: '', email: '' });
  const [loader, setloader] = useState(false)

  const HandleCancelEdite = (e) => {
    e.preventDefault();
    setEditMode(false);
    setformData({ name: '', username: '', password: '', confirm: '', email: '' });
    setErrors({ name: '', username: '', password: '', confirm: '', email: '', update: '' });
  }

  const handelVerify = async (e) => {
    e.preventDefault();

    try {
      setloader(true)

    } catch (error) {

    } finally {
      setloader(false)
    }
  }

  const refresh = async () => {
    try {
      setloader(true)
      const response = await axios.post(`${API_URL}/getUserData`, {
        identifier: user._id,
      });

      if (response.status !== 200) {
        console.error("Failed to save user data to backend:", response.data);
        return false; // Block login if backend fails
      }
      setUser(response.data);

    } catch (error) {
      console.log("Error storing user:", error.response?.data || error.message);
    } finally {
      setloader(false)

    }
  }
  const nameValidation = () => {
    const newName = formData.name;

    if (!/^[A-Za-z\s]+$/.test(newName) && formData.name !== '' && formData.name.length > 0) {
      setErrors((prev) => ({ ...prev, name: 'Name must contain only letters' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: '' }));
    return true;
  };
  const usernameValidation = () => {
    const newUserName = formData.username;


    if (newUserName.length < 6) {
      setErrors((prev) => ({ ...prev, username: 'Username must be at least 6 characters long' }));
      return false;
    }

    setErrors((prev) => ({ ...prev, username: '' }));
    return true;
  }
  const NewPasswordValidation = () => {
    const newPassword = formData.password;


    if (!newPassword.trim() && formData.confirm !== '') {
      setErrors((prev) => ({ ...prev, password: 'New password cannot be empty' }));
      return false;
    }

    if (newPassword.length < 6 && formData.confirm !== '') {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: '' }));
    return true;
  }
  const confirmPasswordValidation = () => {
    const newConfirm = formData.confirm;

    if (!newConfirm.trim() && formData.password !== '') {
      setErrors((prev) => ({ ...prev, confirm: 'Password cannot be empty' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirm: '' }));
    return true;
  }
  const emailValidation = () => {
    const newEmail = formData.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(newEmail) && formData.email !== '') {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      return false;
    }

    setErrors((prev) => ({ ...prev, email: '' }));
    return true;
  }
  const handleUpdate = (e) => {
    e.preventDefault();

    let isValid = true;

    if (formData.name !== '') {
      isValid = nameValidation({ target: { value: formData.name } }) && isValid;
    }
    if (formData.username !== '') {
      isValid = usernameValidation({ target: { value: formData.username } }) && isValid;
    }
    if (formData.password !== '') {
      isValid = NewPasswordValidation({ target: { value: formData.password } }) && isValid;
    }
    if (formData.confirm !== '') {
      isValid = confirmPasswordValidation({ target: { value: formData.confirm } }) && isValid;
    }
    if (formData.email !== '') {
      isValid = emailValidation({ target: { value: formData.email } }) && isValid;
    }

    if (isValid) {
      if (formData.name || formData.username || formData.password || formData.confirm || formData.email) {
        UpdateBackend();
      } else {
        setErrors((prev) => ({ ...prev, update: 'Nothing changed' }));
      }
    }
    setTimeout(() => {
      setErrors({ username: '', password: '', name: '', confirm: '', update: '', email: '' });
    }, 3000);
  };
  const UpdateBackend = async () => {
    try {
      setloader(true);
      const requestBody = {};
      if (formData.name) requestBody.name = formData.name;
      if (formData.username) requestBody.username = formData.username;
      if (formData.password) requestBody.newPass = formData.password;
      if (formData.confirm) requestBody.oldPass = formData.confirm;
      if (formData.email) requestBody.email = formData.email;
      if (user._id) requestBody.id = user._id;

      const res = await axios.post(`${API_URL}/updateUser`, requestBody);

      if (res.status === 200) {
        console.log('Account created successfully:', res.data);
        setUser(res.data.user)
        refresh();
        setErrors((prev) => ({ ...prev, update: 'Data updated successfully' }));
        setformData({ name: '', username: '', password: '', confirm: '', email: '' });
        setTimeout(() => {
          setErrors({ username: '', password: '', name: '', confirm: '', update: '', email: '' });
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setErrors((prev) => ({ ...prev, update: data.message }));
        } else if (status === 422) {
          setErrors((prev) => ({ ...prev, update: data.message || 'Invalid input data' }));
        } else if (status === 500) {
          setErrors((prev) => ({ ...prev, update: 'Server error. Please try again later.' }));
        } else {
          setErrors((prev) => ({ ...prev, update: data.message || 'An unexpected error occurred' }));
        }
      } else {
        // Network or other unexpected errors
        setErrors((prev) => ({ ...prev, update: 'Network error. Please check your connection.' }));
      }
      console.log('Error creating account:', error.response?.data || error.message);
    } finally {
      setformData({ name: '', username: '', password: '', confirm: '', email: '' });
      setTimeout(() => {
        setErrors({ username: '', password: '', name: '', confirm: '', update: '', email: '' });
      }, 3000);
      setloader(false);
      setEditMode(false);

    }
  };

  return (
    loader ?
      <Loader />
      :
      isLoged ?
        <div className='w-full h-full bg-white flex items-center justify-center '>
          <div className="bg-white max-w-full w-[600px] h-fit max-h-[80%] flex flex-col p-5 rounded-xl overflow-auto shadow-2xl">
            <img src="/svg/refresh-com.svg" alt="refresh" className='w-[25px] self-center cursor-pointer' onClick={refresh} />
            <div className="flex items-center gap-2 p-2 md:px-10">
              <img className='sm:w-[60px] w-[40px] sm:h-[60px] h-[40px] rounded-full border' src={user?.image || "/svg/unknown-com.svg"} alt="img" />
              <div>
                <p className='sm:text-xl font-medium text-md'>{user?.name || 'Name'}</p>
                <p className='text-[#6b7380] font-normal sm:text-md'>{user?.email || 'example@gmail.com'}</p>
              </div>
            </div>
            <div className="flex flex-col p-2 justify-start items-start gap-2 md:px-10">
              <p className='sm:text-xl font-medium text-md'>Name</p>
              {
                errors.name !== '' ?
                  <p className='text-sm font-normal text-red-600'>{errors.name}</p>
                  :
                  ''
              }
              <input type="text" value={formData.name} onChange={(e) => { setformData((prevData) => ({ ...prevData, name: e.target.value })) }} placeholder={user?.name || ''} readOnly={!editMode} className='border border-neutral-400 text-neutral-500 max-w-full w-[250px] sm:h-[30px] p-1 px-2 text-sm outline-none focus:outline-none rounded-md' />
            </div>
            <div className="flex flex-col p-2 justify-start items-start gap-2 md:px-10">
              <p className='sm:text-xl font-medium text-md'>Email</p>
              {
                errors.email !== '' ?
                  <p className='text-sm font-normal text-red-600'>{errors.email}</p>
                  :
                  ''
              }
              <input type="text" value={formData.email} onChange={(e) => { setformData((prevData) => ({ ...prevData, email: e.target.value })) }} placeholder={user?.email || ''} readOnly={!editMode} className='border border-neutral-400 text-neutral-500 max-w-full w-[250px] sm:h-[30px] p-1 px-2 text-sm outline-none focus:outline-none rounded-md' />
              <div className="flex items-center gap-2">
                {user?.verification ? (
                  <>
                    <img src="/svg/correct-com.svg" alt="verified" className='w-[20px]' />
                    <p className='text-green-600 font-bold'>Verified</p>
                  </>
                ) : (
                  <>
                    <img src="/svg/cancel-com.svg" alt="not verified" className='w-[20px]' />
                    <p className='text-red-600 font-bold'>Not verified</p>
                    <button className='text-blue-500 text-sm font-bold px-3 py-1 rounded-md underline' onClick={handelVerify}>Verify now</button>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col p-2 justify-start items-start gap-2 md:px-10">
              <p className='sm:text-xl font-medium text-md'>Username</p>
              {
                errors.username !== '' ?
                  <p className='text-sm font-normal text-red-600'>{errors.username}</p>
                  :
                  ''
              }
              <input type="text" value={formData.username} onChange={(e) => { setformData((prevData) => ({ ...prevData, username: e.target.value })) }} placeholder={user?.username || 'no username'} readOnly={!editMode} className='border border-neutral-400 text-neutral-500 max-w-full w-[250px] sm:h-[30px] p-1 px-2 text-sm outline-none focus:outline-none rounded-md' />
            </div>
            <div className="flex flex-col p-2 justify-start items-start gap-2 md:px-10">
              <p className='sm:text-xl font-medium text-md'>Add new password</p>
              {
                errors.confirm !== '' ?
                  <p className='text-sm font-normal text-red-600'>{errors.confirm}</p>
                  :
                  ''
              }
              <input type="text" value={formData.confirm} onChange={(e) => { setformData((prevData) => ({ ...prevData, confirm: e.target.value })) }} placeholder='Current password' readOnly={!editMode} className='border border-neutral-400 text-neutral-500 max-w-full w-[250px] sm:h-[30px] p-1 px-2 text-sm outline-none focus:outline-none rounded-md' />
              {
                errors.password !== '' ?
                  <p className='text-sm font-normal text-red-600'>{errors.password}</p>
                  :
                  ''
              }
              <input type="text" value={formData.password} onChange={(e) => { setformData((prevData) => ({ ...prevData, password: e.target.value })) }} placeholder='New password' readOnly={!editMode} className='border border-neutral-400 text-neutral-500 max-w-full w-[250px] sm:h-[30px] p-1 px-2 text-sm outline-none focus:outline-none rounded-md' />
            </div>
            {
              errors.update !== '' ?
                errors.update === "Data updated successfully" ?
                  <p className='text-sm font-normal text-green-600  md:px-10 p-2'>{errors.update}</p>
                  :
                  <p className='text-sm font-normal text-red-600  md:px-10 p-2'>{errors.update}</p>
                :
                ''
            }
            <div className="flex p-2 justify-start gap-2 md:px-10">
              {!editMode ? (
                <>
                  <button className='bg-black px-4 py-2 text-white md:text-md text-xs rounded-md' onClick={() => setEditMode(true)}>Edit</button>
                  <Link href={'/pages/dashboard'} className='bg-green-500 px-4 py-2 text-white text-xs md:text-md rounded-md'>Dashboard</Link>
                </>
              ) : (
                <>
                  <button className='bg-blue-500 px-4 py-2 text-white text-xs md:text-md rounded-md' onClick={handleUpdate}>Save Changes</button>
                  <button className='bg-red-500 px-4 py-2 text-white text-xs md:text-md rounded-md' onClick={HandleCancelEdite}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
        :
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
          <h2 className='sm:text-xl text-md font-bold uppercase text-center'>You are not logged in. Please log in and try again</h2>
          <Link href={'/pages/form/Login'} className='bg-blue-600 text-white px-5 py-1 rounded-sm'>Login</Link>
        </div>
  );
};

export default Page;
