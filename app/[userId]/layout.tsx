import Footer from "@/components/custom/common/Footer";
import React from "react";

export default function UserProfileLayout({
    children,
    picture,
    profile
}: {
    children: React.ReactNode,
    picture: React.ReactNode,
    profile: React.ReactNode
}) {
    return (
        <div className="overflow-y-scroll w-full">
            {children}
            {profile}
            <div className="px-40">
                {picture}
            </div>
            <Footer />
        </div>
    );
}


