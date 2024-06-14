"use client";
import { useUserState } from '@/context/userContext';
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import FollowerBar from './FollowerBar';
import axios from 'axios';
import { getAllFollowingOfUserByUserId } from '@/constants/queries';


interface FollowerBarProps {
    userName: string,
    name: string | null,
    followRequestId: string,
    userId: string,
    followerId: string,
    isAccepted: boolean,
    imageUrl: string | null
};

interface FollowerUserType {
    id: string,
    followerId: string,
    followingId: string,
    following: {
        imageUrl: string | null,
        name: string | null,
        userName: string
    }
}


const FollowingPage = () => {
    const [allFollowings, setAllFollowings] = useState<FollowerUserType[]>([]);
    const userStates = useUserState();
    const user = userStates ? userStates.user : null;

    const fetchAllFollowingsOfUsers = useCallback(async () => {
        if (!user.id)
            return;
        const allFollowersOfUsersByUserIdResponse = await axios.get(
            `http://localhost:4000/api/user/follow/following/${user.id}`
        );

        if (allFollowersOfUsersByUserIdResponse.status === 200) {
            setAllFollowings((prev) => (allFollowersOfUsersByUserIdResponse.data.users));
        }

    }, [user?.id]);

    useEffect(() => {
        fetchAllFollowingsOfUsers();
    }, [fetchAllFollowingsOfUsers]);

    return (
        <>
            <div className="w-[100dvw] h-[100dvh] bg-[#343434aa] flex justify-center items-center absolute top-0 left-0 z-20">
                <div className="w-[400px] rounded-xl bg-[#454545]">
                    <div className="relative p-3 border-b border-[#494949]">
                        <div className="absolute left-1/2 -translate-x-1/2 font-semibold">Following</div>
                        <Link href={`/${user.userName}`} className='absolute right-3'>
                            <RxCross2 size={24} />
                        </Link>
                    </div>
                    <div className="py-3 px-5">
                        <input placeholder='Search...' className='outline-none bg-transparent w-full' />
                    </div>
                    <div className="min-h-[300px] max-h-[50dvh] overflow-y-scroll">
                        {
                            allFollowings.length > 0 && allFollowings.map((foll) => {
                                return <FollowerBar
                                    key={foll.id}
                                    followRequestId={foll.id}
                                    followerId={foll.followerId}
                                    isAccepted={true}
                                    name={foll.following.name}
                                    userId={foll.followingId}
                                    userName={foll.following.userName}
                                    imageUrl={foll.following.imageUrl} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowingPage
