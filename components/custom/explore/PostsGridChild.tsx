"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import PostDisplayer from '../common/PostDisplayer';

interface PostsGridChildProps {
    url: string,
    big?: boolean,
    height?: string
};

const PostsGridChild: React.FC<PostsGridChildProps> = ({ url, big, height = "h-full" }) => {
    const [overLayShow, SetOverLayShow] = useState<boolean>(false);
    const [postDisplayerOn, setPostDisplayerOn] = useState<boolean>(false);
    return (
        <>
            <div className={
                `w-full ${height} ${big ? 'row-span-2' : ''} relative cursor-pointer`
            }
                onMouseEnter={() => { SetOverLayShow(true) }}
                onMouseLeave={() => { SetOverLayShow(false) }}
                onClick={() => { setPostDisplayerOn(true) }}
            >
                <Image src={url} alt='post' width={200} height={200} className={
                    `object-cover w-full h-full saturate-50`
                } />
                {
                    overLayShow &&
                    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-2 bg-[#12121244]">
                        <FaRegHeart />
                        <div>12.4K</div>
                        <RiMessengerLine />
                        <div>624</div>
                    </div>
                }
            </div>
            {
                postDisplayerOn &&
                <PostDisplayer url={url} setPostDisplayerOn={setPostDisplayerOn} />
            }
        </>
    )
}

export default PostsGridChild