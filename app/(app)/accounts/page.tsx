import Link from 'next/link';
import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const options = [
    {
        type: "title",
        content: "How you use Instagram"
    },
    {
        type: "nav",
        content: "Edit Profile",
        icon: <IoPersonCircleOutline size={28} />,
        link: "edit"
    }
]

const page = () => {
    return (
        <>
            <div className="px-5 pt-5 border-r border-[#454545] h-[100dvh] overflow-y-scroll">
                <div className="font-semibold text-xl p-5">Settings</div>
                {
                    options.map((op, index) => {
                        if (op.type === "title")
                            return (
                            <div key={index} className="px-5 py-3 text-xs text-[#dedede77]">{op.content}</div>)
                            
                        return (   
                             <Link key={index} href={`/accounts/${op.link}`} className="px-5 py-3 hover:bg-[#565656] flex gap-3 rounded-xl items-center">
                                <div className="">
                                    {op.icon}
                                </div>
                                <div className="">
                                    {op.content}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default page
