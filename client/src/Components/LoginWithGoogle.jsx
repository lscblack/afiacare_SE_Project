import React from 'react'
import MyApi from '../AxiosInstance/MyApi';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import MainLoad from '../loads/MainLoad';
import { useEffect } from 'react';
import { addUserLogin } from '../features/SharedDataSlice/SharedData';
import { useDispatch } from 'react-redux';


export default function LoginWithGoogle({ data, setData, avatar }) {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    // setShowLoad(true)
    const [showLoad, setShowLoad] = useState(true)
    //-----------------------check if user is new or old user
    const checkInfo = async () => {
        try {
            const response = await MyApi.post(`auth/google-auth-token?Email=${data.email}`);
            if (response.status >= 200 && response.status <= 299) {
                const UserData = response.data
                if (dispatch(addUserLogin(UserData))) {
                    window.location.href = "/dashboard"
                } else {
                    toast.dismiss();
                    toast.error("Unable To Establish Session For You Retry");
                    setShowLoad(false)
                }
                setShowLoad(false)
            }
            setShowLoad(false)

        }
        catch (err) {
            if (err.response.status == 401) {
                setShowLoad(false)
            }
            setShowLoad(false)

            console.log(err.response)
        }
    }
    useEffect(() => {
        checkInfo()
    }, [])
    //----------------password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    //----------handel inputs
    const ChangeData = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
    //------------------------------for Registeration
    const register_New_User = async () => {
        setShowLoad(true)
        // Check if  fields are filled
        const { fname, lname, username, email, password } = data;
        if (!fname || !lname || !username || !email || !password) {
            toast.dismiss();
            toast.warning('All fields .');
            setShowLoad(false)
            return;
        } else {
            setShowLoad(true)
            try {
                const response = await MyApi.post(`auth/google-auth?avatar=${avatar}`, data);

                if (response.data && response.data.status_code == 400) {
                    toast.dismiss();
                    toast.error(`Error: ${response.data.detail || 'An error occurred'}`);
                    setShowLoad(false)
                    console.log('Error detail:', JSON.stringify(response.data, null, 2)); // Pretty print the object
                } else if (response.status >= 200 && response.status <= 299) {
                    const UserData = response.data
                    if (dispatch(addUserLogin(UserData))) {
                        window.location.href = "/dashboard"
                    } else {
                        toast.dismiss();
                        toast.error("Unable To Establish Session For You Retry");
                    }
                    setShowLoad(false)
                } else {
                    toast.dismiss();
                    toast.error('An unexpected error occurred.');
                    setShowLoad(false)
                    console.log('Unexpected response:', JSON.stringify(response, null, 2)); // Pretty print the object
                }
                setShowLoad(false)
            } catch (err) {
                toast.dismiss();
                toast.error('An unexpected error occurred.');
                console.log('Error:', err);
                setShowLoad(false)
            }
        }


    };

    return (
        <>
            {showLoad && <>
                <div className="fixed w-screen h-screen bg-white z-50 top-0 left-0">
                    <MainLoad title="Validating Your Data" />
                </div>
            </>}
            <div className="p-6 rounded w-full max-w-lg mt-3 bg-gray-100">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-auto border-blue-500">
                    <img src={avatar} alt={data.username} className='w-full h-full object-cover hover:scale-110 cursor-pointer' />
                </div>
                <div className="text-slate-700 mt-2 mb-4 flex items-center text-sm justify-center"><FcGoogle className="mr-2" /> You Are Seeing this because its your First Time On AfiaCare</div>
                <div className="mb-4 relative">
                    <label htmlFor="username" className="block text-slate-700 text-light font-semibold mb-2">
                        Enter New Username
                    </label>
                    <input
                        onChange={(e) => ChangeData(e)}
                        type='text'
                        value={data.username}
                        id="username"
                        className="w-full p-3 border rounded bg-slate-200 text-slate-700 outline-none"
                        placeholder="Enter New UserName"
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-slate-700 text-light font-semibold mb-2">
                        Create New Password
                    </label>
                    <input
                        onChange={(e) => ChangeData(e)}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="w-full p-3 border rounded bg-slate-200 text-slate-700 outline-none"
                        placeholder="Enter New Password To Use"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} className="absolute right-4 top-11 text-[#36857b] text-xl"
                    >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>
                <button onClick={() => register_New_User()} type="submit" className="w-full bg-[#36857b] text-slate-200 py-3 rounded hover:bg-[#276b63] mb-4">
                    Continue
                </button>
            </div>
        </>
    )
}
