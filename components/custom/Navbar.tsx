"use client";
import React from 'react';
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiAddToQueue } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';


const iconMap = {
    home: <GoHome />,
    search: <IoSearch />,
    explore: <FaRegCompass />,
    reels: <SiYoutubeshorts />,
    direct: <RiMessengerLine />,
    notifications: <FaRegHeart />,
    create: <BiAddToQueue />,
    profile: <Image src={"/images/sonu_profile.jpeg"} width={25} height={25} alt='profile' className='rounded-full object-cover w-[25px] h-[25px]' />,
}

const mainOptions:
    {
        "id": Number,
        "icon": string,
        "title": string
    }[] = [
        {
            "id": 1,
            "icon": "home",
            "title": "Home"
        },
        {
            "id": 2,
            "icon": "search",
            "title": "Search"
        },
        {
            "id": 3,
            "icon": "explore",
            "title": "Explore"
        },
        {
            "id": 4,
            "icon": "reels",
            "title": "Reels"
        },
        {
            "id": 5,
            "icon": "direct",
            "title": "Messages"
        },
        {
            "id": 6,
            "icon": "notifications",
            "title": "Notifications"
        },
        {
            "id": 7,
            "icon": "create",
            "title": "Create"
        },
        {
            "id": 8,
            "icon": "profile",
            "title": "Profile"
        },
    ]

const Navbar = () => {
    return (
        <div className='p-5 px-3 min-w-[250px] w-[250px] flex flex-col bg-[#101010] border-r border-[#ddd] border-opacity-20 justify-between h-full'>
            <div className="flex flex-col">
                <Link href={"/"} className="text-2xl px-2 py-5 cursor-pointer">
                    Instagram
                </Link>
                <div className="flex flex-col gap-2 py-3">
                    {
                        mainOptions.map((opt, index) => {
                            return (
                                <Link href={`${opt.icon !== "search" ? opt.icon !== "home" ? opt.icon : "/" : "#"}`} key={index} className='flex gap-3 py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323]'>
                                    <div className="text-[28px] w-[30px]">
                                        {iconMap[opt.icon]}
                                    </div>
                                    <div className="">
                                        {opt.title}
                                    </div>
                                </Link>)
                        })
                    }
                </div>
            </div>
            <div className="">
                <div className='hover:bg-[#232323] rounded-lg'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-full flex gap-3 border-none outline-none py-3 px-2   cursor-pointer'>
                            <div className="text-2xl w-[30px]">
                                <GiHamburgerMenu />
                            </div>
                            <div className="">
                                More
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border-none w-[220px] p-3'>
                            <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]'>Settings</div>
                            <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]' >Log Out</div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Navbar