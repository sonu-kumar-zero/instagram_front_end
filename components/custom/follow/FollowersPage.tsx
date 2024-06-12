"use client";
import { getAllFollowersOfUserByUserId } from '@/constants/queries';
import { useUserState } from '@/context/userContext';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import Link from "next/link";
import FollowerBar from './FollowerBar';


interface FollowerUserType {
    id: string,
    followerId: string,
    followingId: string,
    isAccepted: boolean,
    user: {
        imageUrl: string | null,
        name: string | null,
        userName: string
    }
}


const FollowersPage = () => {
    const [allFollowers, setAllFollowers] = useState<FollowerUserType[]>([]);
    const userStates = useUserState();
    const user = userStates ? userStates.user : null;

    // we will implement pagination in it later 
    const fetchAllFollowersOfUsers = useCallback(async () => {
        const allFollowersOfUsersByUserIdResponse = await axios.post(
            `http://127.0.0.1:5000/graphql`,
            {
                query: getAllFollowersOfUserByUserId,
                variables: {
                    getAllFollowersByUserIdId: user.id
                }
            }
        );

        if (allFollowersOfUsersByUserIdResponse.status === 200) {
            setAllFollowers((prev) => (allFollowersOfUsersByUserIdResponse.data.data.getAllFollowersByUserId));
        }

    }, [user.id]);

    useEffect(() => {
        fetchAllFollowersOfUsers();
    }, [fetchAllFollowersOfUsers]);

    return (
        <>
            <div className="w-[100dvw] h-[100dvh] bg-[#343434aa] flex justify-center items-center absolute top-0 left-0 z-20">
                <div className="w-[400px] rounded-xl bg-[#454545]">
                    <div className="relative p-3 border-b border-[#494949]">
                        <div className="absolute left-1/2 -translate-x-1/2 font-semibold">Followers</div>
                        <Link href={`/${user.userName}`} className='absolute right-3'>
                            <RxCross2 size={24} />
                        </Link>
                    </div>
                    <div className="py-3 px-5">
                        <input placeholder='Search...' className='outline-none bg-transparent w-full' />
                    </div>
                    <div className="min-h-[300px] max-h-[50dvh] overflow-y-scroll">
                        {
                            allFollowers.map((foll) => {
                                return <FollowerBar
                                    key={foll.id}
                                    followRequestId={foll.id}
                                    followerId={foll.followerId}
                                    isAccepted={foll.isAccepted}
                                    name={foll.user.name}
                                    userId={foll.followingId}
                                    userName={foll.user.userName}
                                    imageUrl={foll.user.imageUrl} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowersPage
