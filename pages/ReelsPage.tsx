"use client";
import ReelsCard from '@/components/custom/reels/ReelsCard'
import React, { useState } from 'react'

interface ReelsPageProps {
}

const ReelsPage: React.FC<ReelsPageProps> = () => {
    const [audioPlaying, setAudioPlaying] = useState<boolean>(true);
    return (
        <div className="h-[100dvh] w-full overflow-y-scroll flex flex-col items-center snap-mandatory snap-y pr-28">
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid1.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid2.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid3.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid4.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid1.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid2.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid3.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
            <ReelsCard url={"/videos/vid4.mp4"} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} />
            <div className="w-full h-[16px]">&nbsp;</div>
        </div>
    )
}

export default ReelsPage
