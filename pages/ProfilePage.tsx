"use client";
import Image from 'next/image'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { FiSettings } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { MdGridOn } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { useUserState } from '@/context/userContext';
import axios from "axios";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface ProfilePageProps {
    userName: string | null
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userName }) => {
    const userStates = useUserState();
    const realUser = userStates?.user;

    const [user, setUser] = useState({
        imageUrl: null,
        userName: null,
        postsCount: 0,
        followerCount: 0,
        followingCount: 0,
        name: null,
        bio: null,
        id: null
    });

    const func = useCallback(async () => {
        const searchUserFromUserName = await axios.get(
            `http://localhost:4000/api/user/data/${userName}`
        );
        if (searchUserFromUserName.status === 200) {
            setUser((prev) => searchUserFromUserName.data.user);
        };
    }, [userName]);

    useEffect(() => {
        if (userStates?.user?.userName === userName) {
            setUser(userStates?.user);
        } else {
            func();
        }
    }, [func, userStates?.user, userName]);

    const handleFriendRequestSend = async () => {
        try {
            if (!realUser.id || !user.id)
                return;
            const friendRequestSendResponse = await axios.post(`http://localhost:4000/api/user/follow/${realUser.id}/${user.id}`);
            console.log(friendRequestSendResponse);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    if (!user) {
        return <div>Loading...</div>;
    };

    return (
        <>
            {user &&
                <div className="px-40">
                    <div className="px-10 py-10  ">
                        <div className="px-10 flex gap-20 items-center">
                            <div className="">
                                <Image src={user.imageUrl ? `http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/300_300.jpg` : "/images/sonu_profile.jpg"} width={200} height={200} alt='profile_img' className='w-[200px] h-[200px] rounded-full object-cover' />
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-5 items-center">
                                    <div className="">{user.userName}</div>
                                    <div className="flex gap-2 text-sm">
                                        {
                                            userName === realUser?.userName ?
                                                <>
                                                    <Link href={"/accounts"} className="bg-[#56565666] px-4 py-1 rounded-md">Edit profile</Link>
                                                    <button className="bg-[#56565666] px-4 py-1 rounded-md">View archive</button>
                                                    <button className="">
                                                        <FiSettings size={28} />
                                                    </button>
                                                </> :
                                                <>
                                                    <button className="text-[#dedede] bg-[#0095f6] px-4 py-1 rounded-md" onClick={handleFriendRequestSend}>Follow</button>
                                                    <button className="">
                                                        <HiOutlineDotsHorizontal size={28} />
                                                    </button>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className="text-sm flex gap-10">
                                    <div className="flex gap-1">
                                        <span className='font-semibold'>{user.postsCount}</span>
                                        <span>post</span>
                                    </div>
                                    <Link href={`/${user.userName}/followers`} className="flex gap-1 cursor-pointer">
                                        <span className='font-semibold'>{user.followerCount}</span>
                                        <span>followers</span>
                                    </Link>
                                    <Link href={`/${user.userName}/following`} className="flex gap-1 cursor-pointer">
                                        <span className='font-semibold'>{user.followingCount}</span>
                                        <span>following</span>
                                    </Link>
                                </div>
                                <div className="">
                                    <div className="text-xs font-semibold">{user.name ? user.name : user.userName}</div>
                                    <pre className="text-sm break-all">{user.bio}</pre>
                                    {/* <div className="text-xs">NSUT25</div> */}
                                </div>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="flex px-5 gap-10 pt-5 pb-10 border-b border-[#dedede44]">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="rounded-full p-1 bg-[#343434]">
                                <div className="bg-[#343434] rounded-full p-5 border-2 border-[#000]">
                                    <IoAddOutline size={40} />
                                </div>
                            </div>
                            <div className="font-semibold text-sm">New</div>
                        </div>

                    </div>

                    <div className="flex justify-center gap-16 py-5">
                        <Link href={`/${user.userName}`} className='flex gap-3 items-center'>
                            <MdGridOn />
                            <span className='font-semibold'>POSTS</span>
                        </Link>
                        <Link href={`/${user.userName}/saved`} className='flex gap-3 items-center'>
                            <FaRegBookmark />
                            <span className='font-semibold'>SAVED</span>
                        </Link>
                        <Link href={`/${user.userName}/tagged`} className='flex gap-3 items-center'>
                            <BsPersonSquare />
                            <span className='font-semibold'>TAGGED</span>
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfilePage
