import React from 'react'
import Footer from "@/components/custom/common/Footer";
import ProfileImageChange from '@/components/custom/accounts/ProfileImageChange';

const page = () => {
  const textAreaValue: string = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero deserunt eaque,";
  return (
    <>
      <div className="overflow-y-scroll h-[100dvh]">

        <div className="px-40 py-5 ">
          <div className="py-5 text-xl font-semibold">Edit Profile</div>
          <ProfileImageChange />

          <div className="py-4">
            <div className="text-lg font-semibold pb-3">Name</div>
            <div className="">
              <input value={"starksonu12"} className='p-3 rounded-xl outline-none border border-[#454545] w-full bg-[#282828]' />
            </div>
            <div className="text-xs text-[#676767] pt-2">
              It is not your user name.
            </div>
          </div>

          <div className="py-4">
            <div className="text-lg font-semibold pb-3">Bio</div>
            <div className="">
              <textarea value={textAreaValue} className='p-3 rounded-xl outline-none border border-[#454545] w-full' rows={2} />
            </div>
          </div>

          <div className="flex justify-end py-4">
            <button className="bg-[#0095f6] text-[#dedede] px-3 py-2 rounded-xl">Submit Change</button>
          </div>
        </div>
        <Footer />
      </div>
      <div className=""></div>
    </>
  )
}

export default page
