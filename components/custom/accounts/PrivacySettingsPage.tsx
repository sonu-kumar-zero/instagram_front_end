"use client";
import { useUserState } from '@/context/userContext';
import React from 'react'
import Footer from '@/components/custom/common/Footer';

const PrivacySettingsPage = () => {
    const userStates = useUserState();
    const user = userStates ? userStates.user : null;
    return (
        <>
            {
                user &&
                (
                    <>
                        <div className="h-[100dvh] flex flex-col justify-between">
                            <div className="px-40 py-5">
                                <div className="py-5 text-xl font-semibold">Account Privacy</div>
                                <div className="py-4 flex justify-between">
                                    <div className="">Private Account</div>
                                    <div className="">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <span className="text-sm text-[#676767]">
                                        When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don’t have an Instagram account.
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <span className="text-sm text-[#676767]">
                                        When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. 
                                        <a href="#" className='text-[#0095f6] pl-1'>Learn More...</a>
                                    </span>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PrivacySettingsPage
