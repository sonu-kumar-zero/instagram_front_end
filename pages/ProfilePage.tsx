"use client";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FiSettings } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { MdGridOn } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProfilePageProps {
    userName: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ }) => {
    const user = useSelector((state: RootState) => state?.user.user);
    return (
        <>
            {
                user &&
                <div className="px-40">
                    <div className="px-10 py-10  ">
                        <div className="px-10 flex gap-20 items-center">
                            <div className="">
                                <Image src={"/images/sonu_profile.jpeg"} width={200} height={200} alt='profile_img' className='w-[200px] h-[200px] rounded-full object-cover' />
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-5 items-center">
                                    <div className="">{user.userName}</div>
                                    <div className="flex gap-2 text-sm">
                                        <button className="bg-[#56565666] px-4 py-1 rounded-md">Edit profile</button>
                                        <button className="bg-[#56565666] px-4 py-1 rounded-md">View archive</button>
                                        <button className="">
                                            <FiSettings size={28} />
                                        </button>
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
                                    <div className="text-sm break-all">{user.bio}</div>
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
                </div>}
        </>
    )
}

export default ProfilePage
