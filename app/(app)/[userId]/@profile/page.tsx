"use client";
import React from 'react';
import ProfilePage from "@/pages/ProfilePage";

interface PageProps {
  params: {
    userId: string
  }
}

const Page: React.FC<PageProps> = ( ) => {
  return (
    <>
      <ProfilePage />
    </>
  )
}

export default Page
