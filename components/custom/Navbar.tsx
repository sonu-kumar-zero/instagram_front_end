"use client";
import React, { useState } from 'react';
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiAddToQueue } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { useUserState } from '@/context/userContext';
import SearchView from '@/components/custom/search/SearchView';


const iconMap: Record<string, React.ReactNode> = {
    home: <GoHome />,
    search: <IoSearch />,
    explore: <FaRegCompass />,
    reels: <SiYoutubeshorts />,
    direct: <RiMessengerLine />,
    notifications: <FaRegHeart />,
    create: <BiAddToQueue />,
    profile: (<Image src={"/images/sonu_profile.jpeg"} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />),
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


interface NavbBarProps {
    setSearchBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    serachBoxEnabled: boolean
}

const NormalNavbar: React.FC<NavbBarProps> = ({ setSearchBoxEnabled }) => {
    const userState = useUserState();
    const user = userState ? userState.user : null;
    return (
        <div className='p-5 px-3 min-w-[250px] w-[250px] flex flex-col bg-[#101010] border-r border-[#ddd] border-opacity-20 justify-between h-full'>
            <div className="flex flex-col">
                <div className="h-[50px] w-fit">
                    <Link href={"/"} className="text-2xl px-2 py-5 cursor-pointer">
                        Instagram
                    </Link>
                </div>
                <div className="flex flex-col gap-2 py-3">
                    {
                        mainOptions.map((opt, index) => {
                            return (
                                <Link href={`${opt.icon !== "search" ? opt.icon !== "home" ? opt.icon === "profile" ? "/" + user?.userName : "/" + opt.icon : "/" : "#"}`} key={index} className='flex gap-3 py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00]' onClick={
                                    (e) => {
                                        if (opt.icon === "search") {
                                            setSearchBoxEnabled(true);
                                        }
                                    }
                                } >
                                    <div className="text-[28px] px-[2px] w-[34px]" >
                                        {
                                            (opt.icon === "profile" && user?.imageUrl !== null)
                                                ?
                                                <Image src={`http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                                : iconMap[opt.icon]
                                        }
                                    </div>
                                    <div className="">
                                        {opt.title === "Profile" ? user?.userName : opt.title}
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
                            <div className="text-2xl px-[2px] w-[34px]">
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


const SimpleNavbar: React.FC<NavbBarProps> = ({ setSearchBoxEnabled, serachBoxEnabled }) => {
    const userState = useUserState();
    const user = userState ? userState.user : null;
    return (
        <>
            <div className="min-w-[250px] w-[250px] relative">
                <div className='p-5 px-3 min-w-fit w-fit flex flex-col bg-[#101010] border-r border-[#ddd] border-opacity-20 justify-between h-full'>
                    <div className="flex flex-col">
                        <div className="h-[50px] w-fit ">
                            <Link href={"/"} className="text-[28px] w-[50px] h-[50px] cursor-pointer flex items-center justify-center hover:bg-[#232323] rounded-lg">
                                <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt='logo' className='rounded-lg object-cover w-[40px] h-[40px]' />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 py-3">
                            {
                                mainOptions.map((opt, index) => {
                                    return (
                                        <Link href={`${opt.icon !== "search" ? opt.icon !== "home" ? opt.icon === "profile" ? "/" + user?.userName : "/" + opt.icon : "/" : "#"}`} key={index} className='flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center' onClick={
                                            (e) => {
                                                if (opt.icon === "search") {
                                                    setSearchBoxEnabled(false);
                                                }
                                            }
                                        }>
                                            <div className="text-[28px] " >
                                                {
                                                    (opt.icon === "profile" && user?.imageUrl !== null)
                                                        ?
                                                        <Image src={`http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                                        : iconMap[opt.icon]}
                                            </div>
                                        </Link>)
                                })
                            }
                        </div>
                    </div>
                    <div className="">
                        <div className='flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center'>
                            <DropdownMenu>
                                <DropdownMenuTrigger className=''>
                                    <div className="text-2xl w-full">
                                        <GiHamburgerMenu />
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
                <SearchView />
            </div>
        </>
    )
}

const Navbar = () => {

    const [serachBoxEnabled, setSearchBoxEnabled] = useState<boolean>(false);

    return (
        <>
            {serachBoxEnabled ? <SimpleNavbar setSearchBoxEnabled={setSearchBoxEnabled} serachBoxEnabled={serachBoxEnabled} /> : <NormalNavbar setSearchBoxEnabled={setSearchBoxEnabled} serachBoxEnabled={serachBoxEnabled} />}
        </>
    )
}

export default Navbar