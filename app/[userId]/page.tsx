"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface PageProps {
    params: {
        userId: string
    }
}

const Page: React.FC<PageProps> = ({ params }) => {

    const router = useRouter();
    if (params.userId === "reels") {
        router.push("/reels/reel1");
    }

    return <>
        User Profile Page
    </>
};

export default Page;