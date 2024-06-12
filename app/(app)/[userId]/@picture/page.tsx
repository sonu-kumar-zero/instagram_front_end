
import React from 'react'
import PostsGridChild from '@/components/custom/explore/PostsGridChild'

interface PageProps {
  params: {
    userId: string
  }
}


const page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <div className="grid grid-cols-3 w-full gap-1">
        <PostsGridChild url={"/images/high/1.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/2.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/3.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/4.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/5.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/6.jpg"} height={"h-[300px]"}/>
        <PostsGridChild url={"/images/high/7.jpg"} height={"h-[300px]"}/>
      </div>         
    </>
  )
}

export default page
