import React from 'react';
import ProfilePage from "@/pages/ProfilePage";

interface PageProps {
  params: {
    userId: string
  }
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <ProfilePage userName={params.userId} />
    </div>
  )
}

export default Page
