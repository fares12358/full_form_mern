import { useAppContext } from "@/app/Context";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
const Sign = () => {
  const { user, isLoged, isLogedDash, setisLogedDash } = useAppContext();
  const [loader, setloader] = useState(false);
  const [passType, setpassType] = useState('password');
<<<<<<< HEAD
  const [formData, setFormData] = useState({ username: 'fares', password: '5uoru2cm' });
=======
  const [formData, setFormData] = useState({ username: 'fares', password: 'jpqmvfq4' });
>>>>>>> 75a44478f9bb18d179930d8d031cbb51a63c9256
  const [errors, setErrors] = useState({ username: '', password: '', login: '', getpass: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = 'f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'

  const usernameValidation = (e) => {
    const newUserName = e.target.value;
    setFormData((prevData) => ({ ...prevData, username: newUserName }));
    if (!newUserName.trim()) {
      setErrors((prev) => ({ ...prev, username: 'Username cannot be empty' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, username: '' }));
    return true;
  }

  const passwordValidation = (e) => {
    const newUserName = e.target.value;

    setFormData((prevData) => ({ ...prevData, password: newUserName }));

    if (!newUserName.trim()) {
      setErrors((prev) => ({ ...prev, password: 'Password cannot be empty' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: '' }));
    return true;
  }
  const login = (e) => {
    e.preventDefault();
    const usernameValid = usernameValidation({ target: { value: formData.username } });
    const passwordValid = passwordValidation({ target: { value: formData.password } });
    if (usernameValid && passwordValid) {
      dashLoginBack({ username: formData.username, password: formData.password });
    }
  };

  const dashLoginBack = async (data) => {
    try {
      setloader(true);
      const res = await axios.post(`${API_URL}/dashLogin`, data,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      if (res.status === 200) {
        setisLogedDash(true)
        return true
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        const { status, data } = error.response;
        errorMessage = data.message || errorMessage;
      }
      setErrors((prev) => ({ ...prev, login: errorMessage }));

      return false
    } finally {
      setloader(false);
      setTimeout(() => {
        setErrors((prev) => ({ ...prev, username: '', password: '', login: '', getpass: '' }));
      }, 3000);

    }
  }

  const getPassHandel = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
      const res = await axios.post(`${API_URL}/dashGetPass`,{},
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      if (res.status === 200) {
        setErrors((prev) => ({ ...prev, getpass: res.data.message }));
        return true
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        const { status, data } = error.response;
        errorMessage = data.message || errorMessage;
      }
      setErrors((prev) => ({ ...prev, login: errorMessage }));

      return false
    } finally {
      setloader(false);
      setTimeout(() => {
        setErrors((prev) => ({ ...prev, username: '', password: '', login: '', getpass: '' }));
      }, 3000);
    }
  }



  return (
    loader ?
      <Loader />
      :
      <>
        <div className="relative container-fluid w-full min-h-[100vh] bg-[#09090b] text-white flex justify-center items-center p-5">
          <div className="font-bold bg-[rgb(24,24,27)] md:px-20 px-5 py-10 border border-neutral-800 flex flex-col justify-start items-center rounded-xl">
            <h1 className="md:text-3xl text-xl uppercase my-5">login</h1>
            <p className="text-xs my-4 font-bold text-neutral-200 uppercase text-center">
              login to open the admin dashboard
            </p>
            <form className=" w-full flex flex-col justify-start items-center ">
              {
                errors.username === "" ?
                  ''
                  :
                  <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.username}</p>
              }
              <input
                type="text"
                placeholder="Enter username"
                className="my-5 px-5 py-2 bg-[#242427] outline-none rounded-lg border border-neutral-600"
                value={formData.username}
                onChange={(e) => usernameValidation(e)}

              />
              {
                errors.password === "" ?
                  ''
                  :
                  <p className='text-red-600 font-medium text-start  w-full max-w-[400px] text-wrap text-xs xl:text-md'>{errors.password}</p>
              }
              <div className="relative w-fit h-fit my-5">
                <input
                  type={passType}
                  placeholder="Enter password"
                  className="px-5 py-2 bg-[#242427] outline-none rounded-lg border border-neutral-600"
                  value={formData.password}
                  onChange={(e) => passwordValidation(e)}
                />
                {
                  passType == 'password' ?
                    <img src={`/svg/eye-hidden copy.svg`} className='w-[25px] p-[2px] absolute right-2 top-[10px] cursor-pointer' alt="eye" onClick={() => setpassType("text")} />
                    :
                    <img src={`/svg/eye- copy.svg`} className='w-[25px] p-[2px] absolute right-2 top-[10px] cursor-pointer' alt="eye" onClick={() => setpassType("password")} />
                }
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm text-gray-600 gap-1 flex items-center">
                  Forget Password
                  <button
                    className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                    onClick={getPassHandel}
                  >
                    Get password?
                  </button>
                </p>
              </div>
              {
                errors.login === "" ?
                  ''
                  :
                  <p className='text-red-600 font-medium text-center  w-full max-w-[400px] text-wrap text-xs xl:text-md mt-4'>{errors.login}</p>
              }
              {
                errors.getpass === "" ?
                  ''
                  :
                  <p className='text-green-600 font-medium text-center  w-full max-w-[400px] text-wrap text-xs xl:text-md mt-4'>{errors.getpass}</p>
              }
              <button
                className="md:px-5 px-5 py-2 mt-5 bg-neutral-800 rounded-md border border-neutral-600 text-xs"
                onClick={login}
              >
                login
              </button>
            </form>
            <Link
              className="mt-5 uppercase text-orange-500 text-sm"
              href={"/"}
            >
              back to website
            </Link>
          </div>
        </div>
      </>
  );
};

export default Sign;
