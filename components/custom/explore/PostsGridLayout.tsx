"use client";
import Image from 'next/image'
import React from 'react'
import PostsGridChild from './PostsGridChild';

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
          <PostsGridChild url={url1} big={true}/>
          :
          <PostsGridChild url={url1}/>
      }
      <PostsGridChild url={url2} />
      {
        isLeftLayout ?
          <PostsGridChild url={url3} />
          :
          <PostsGridChild url={url3} big={true}/>
      }
      <PostsGridChild url={url4}/>
      <PostsGridChild url={url5}/>
    </div>
  )
}

export default PostsGridLayout