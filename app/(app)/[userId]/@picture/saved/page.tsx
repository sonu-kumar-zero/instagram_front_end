import Image from 'next/image'
import React from 'react'


interface SavedCardProps {
  url: string,
  collectionName: string
}

const SavedCard: React.FC<SavedCardProps> = ({ url, collectionName }) => {
  return (
    <>
      <div className="relative">
        <Image src={url} width={300} height={300} alt='saved_post' className='w-full h-[300px] rounded-xl object-cover' />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col p-5 justify-end bg-[#12121233] hover:bg-[#12121211] cursor-pointer">
          <div className="h-fit w-full text-lg">
            {collectionName}
          </div>
        </div>
      </div>
    </>
  )
}

const Page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-[#dedede77]">Only you can see what you&apos;ve saved</div>
        <button className="text-[#0095f6]">+ New Collection</button>
      </div>
      <div className="grid grid-cols-3 gap-3 py-3">
          <SavedCard url={"/images/high/1.jpg"} collectionName='All Posts'/>
          <SavedCard url={"/images/high/5.jpg"} collectionName='N9'/>
          <SavedCard url={"/images/high/2.jpg"} collectionName='Required'/>
          <SavedCard url={"/images/high/10.jpg"} collectionName='Start'/>
      </div>
    </div>
  )
}

export default Page
