"use client";
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileImageChange = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleDialogClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        if (target.classList.contains("dialog_body"))
            setDialogOpen(false);
    }

    return (
        <>
            <div className="my-5 p-3 bg-[#282828] flex justify-between items-center rounded-xl">
                <div className="flex gap-3 items-center">
                    <div className="">
                        <Image src={"/images/sonu_profile.jpeg"} width={60} height={60} alt='profile_img' className='w-[60px] h-[60px] object-cover rounded-full' />
                    </div>
                    <div className="">
                        <div className="font-semibold">Starksonu12</div>
                        <div className="text-xs text-[#787878]">Starksonu12</div>
                    </div>
                </div>
                <button className="bg-[#0095f6] text-[#dedede] px-3 py-2 rounded-xl"
                    onClick={
                        () => {
                            setDialogOpen(true);
                        }
                    }
                >Change photo</button>
            </div>

            {
                dialogOpen &&
                (
                    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] bg-[#00000088] flex justify-center items-center dialog_body" onClick={handleDialogClose}>
                        <div className="w-[400px] bg-[#232323] rounded-xl flex flex-col">
                            <div className="text-xl py-5 text-center cursor-default">Change Profile Photo</div>
                            <button className="text-center py-3 hover:bg-[#323232] text-[#0095fe] ">Upload Photo</button>
                            <button className="text-center  text-[#d13434] py-3 hover:bg-[#323232]">Remove Current Photo</button>
                            <button className="text-center  py-3 hover:bg-[#323232] rounded-b-xl">Cancel</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProfileImageChange
