"use client";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserProps {
    id: string;
    userName: string;
    bio: string | null;
    email: string;
    followerCount: number;
    followingCount: number;
    imageUrl: string | null;
    name: string | null;
    postsCount: number;
}

interface LoginBoxProps {
}

const LoginBox: React.FC<LoginBoxProps> = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: ""
    });

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData((prev) => (
            { ...prev, [target.name]: target.value }
        ))
    };
    const loginHandler = async () => {
        try {
            console.log(formData);
            // dispatch(addUser({userName: "stark", _id:"ajsiuashifhiuas"}));
            // console.log(process.env.NEXT_PUBLIC_USER_API_BACKEND);
            const loginRespose = await axios.post(`${process.env.NEXT_PUBLIC_USER_API_BACKEND}/user/login`, {
                ...formData
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(loginRespose);
            if (loginRespose.status === 200) {
                const user: UserProps = loginRespose.data.user;
                const token = loginRespose.data.token;
                dispatch(addUser(
                    {
                        userName: user.userName,
                        id: user.id,
                        bio: user.bio,
                        email: user.email,
                        followerCount: user.followerCount,
                        followingCount: user.followingCount,
                        imageUrl: user.imageUrl,
                        name: user.name,
                        postsCount: user.postsCount,
                        token: token
                    }
                ));
                router.push("/");
            }
            // router.push("/");
        } catch (error: any) {
            console.log(error?.message);
        }
    }

    return (
        <>
            <form className='flex flex-col gap-1'>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='email' className='text-xs text-[#dedede66]'>UserName, or email</label>
                    <input type='text' placeholder='' id='email' name='email' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.email} onChange={onInputValueChange} />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='password' className='text-xs text-[#dedede66]'>Password</label>
                    <input placeholder='' type='password' id='password' name='password' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.password} onChange={onInputValueChange} />
                </div>
                <div className="py-2">
                    <button className='w-full text-[#dedede] bg-[#00bfffbb] rounded py-2' onClick={
                        (e) => {
                            e.preventDefault();
                            loginHandler();
                        }
                    }>Log in</button>
                </div>
            </form>
        </>
    )
}

export default LoginBox
