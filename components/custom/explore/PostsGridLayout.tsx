"use client";
import Image from 'next/image'
import React from 'react'

interface PostsGridLayoutProps {
  isLeftLayout: boolean,
  url1: string,
  url2: string,
  url3: string,
  url4: string,
  url5: string,
}

const PostsGridLayout: React.FC<PostsGridLayoutProps> = ({ isLeftLayout, url1, url2, url3, url4, url5 }) => {

  return (
    <div className='grid grid-cols-3 gap-1 grid-rows-2 w-full h-[80dvh]'>
      {
        isLeftLayout ?
          <Image src={url1} alt='post' width={500} height={1000} className='row-span-2 object-cover w-full h-full' />
          :
          <Image src={url1} alt='post' width={500} height={500} className='object-cover w-full h-full' />
      }
      <Image src={url2} alt='post' width={500} height={500} className='object-cover w-full h-full' />
      {
        isLeftLayout ?
          <Image src={url3} alt='post' width={500} height={500} className='object-cover w-full h-full' />
          :
          <Image src={url3} alt='post' width={500} height={1000} className='row-span-2 object-cover w-full h-full' />
      }
      <Image src={url4} alt='post' width={500} height={500} className='object-cover w-full h-full' />
      <Image src={url5} alt='post' width={500} height={500} className='object-cover w-full h-full' />
    </div>
  )
}

export default PostsGridLayout