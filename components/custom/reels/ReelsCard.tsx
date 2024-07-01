"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaPlay, FaPause, FaRegHeart, FaRegBookmark, FaMusic } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoEllipsisHorizontal, IoPerson } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { ReelType } from "@/types/modelsTypes";
import ReactPlayer from "react-player";

interface VideoFrameProps {
    url: string;
    videoPlaying: boolean;
    audioPlaying: boolean;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ url, videoPlaying, audioPlaying }) => {

    return (
        <>
            <div className="min-w-[50dvh] max-w-[52dvh] h-[90dvh]">
                {
                    <ReactPlayer
                        url={url}
                        playing={videoPlaying}
                        width="100%"
                        height="90dvh"
                        muted={!audioPlaying}
                        loop={true}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'anonymous'
                                }
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

interface ReelsCardProps {
    url: string;
    audioPlaying: boolean;
    setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    reel: ReelType;
}

const ReelsCard: React.FC<ReelsCardProps> = ({ audioPlaying, setAudioPlaying, reel }) => {

    const videoRef = useRef<HTMLDivElement | null>(null);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

    const handleVidoSwitchOnAndOff = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target?.classList.contains("video_overlay_layer")) {
            setVideoPlaying((prev) => !prev);
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVideoPlaying(prev => prev !== true ? true : prev); // Only update if the state changes
                } else {
                    setVideoPlaying(prev => prev !== false ? false : prev); // Only update if the state changes
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        });

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);


    return <>
        <div className="h-[90dvh] w-fit relative rounded-xl snap-center">
            {/* video component */}
            <div className=" w-fit h-[90dvh] max-h-[90dvh] rounded-lg brightness-90" ref={videoRef}>
                {
                    <VideoFrame
                        url={`http://127.0.0.1:8000/uploads/reels/${reel.url}/index.m3u8`} videoPlaying={videoPlaying}
                        audioPlaying={audioPlaying} />
                }
            </div>

            {/* thumbnail component */}
            <Image src={`http://127.0.0.1:8000/uploads/thumbnails/${reel.url}/1080_1920.jpg`} className="w-full h-full absolute top-0 left-0 blur-[16px] -z-10 brightness-80" width={1080} height={1920} alt="blur_post_thumbnail" />

            {/* extra feauture buttons */}
            <div className="flex flex-col gap-6 absolute bottom-0 -right-14 items-center text-xl">
                <button className="flex flex-col items-center">
                    <FaRegHeart size={28} />
                    <span className="text-xs">{reel.post.likesCount}</span>
                </button>
                <button className="flex flex-col items-center">
                    <RiMessengerLine size={32} />
                    <span className="text-xs">{reel.post.commentCount}</span>
                </button>
                <button>
                    <FiSend size={28} />
                </button>
                <button>
                    <FaRegBookmark size={28} />
                </button>
                <button>
                    <IoEllipsisHorizontal size={28} />
                </button>
                <Image src={`http://127.0.0.1:8000/uploads/profile/${reel.post.user.imageUrl}/100_100.jpg`} width={30} height={30} alt="music_icon" className="w-[30px] h-[30px] rounded object-cover" />
            </div>

            {/* video overlay layer */}
            <div className="w-full h-full p-3 flex flex-col justify-between absolute top-0 left-0 video_overlay_layer bg-[#12121255]" onClick={(e) => {
                handleVidoSwitchOnAndOff(e);
                e.stopPropagation();
            }}>
                <div className="w-full flex justify-end">
                    <button className="bg-[#dedede33] p-2 rounded-full hover:bg-[#dedede66]" onClick={() => setAudioPlaying(prev => !prev)}>
                        {
                            !audioPlaying ?
                                <RxSpeakerOff size={24} /> :
                                <RxSpeakerLoud size={24} />
                        }
                    </button>
                </div>
                {
                    !videoPlaying ?
                        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 video_overlay_layer" onClick={(e) => {
                            handleVidoSwitchOnAndOff(e);
                            e.stopPropagation();
                        }}>
                            <div className="bg-[#dedede33] rounded-full p-3 h-fit">
                                <FaPause size={60} />
                            </div>
                        </div> : <></>
                }
                <div className="w-full flex flex-col gap-3 p-3">
                    <div className="flex gap-3 items-center">
                        <Image src={`http://127.0.0.1:8000/uploads/profile/${reel.post.user.imageUrl}/100_100.jpg`} className="w-[40px] h-[40px] rounded-full" width={40} height={40} alt="user_profile_img" />
                        <span className=" text-sm">{reel.post.user.userName}</span>
                        <span>•</span>
                        <button className="border border-[#dedede] border-opacity-20 rounded-xl hover:from-pink-500 hover:to-yellow-500 px-2 hover:bg-gradient-to-r">Follow</button>
                    </div>
                    <div className="text-sm flex gap-1 w-2/3">
                        <span className="truncate">{reel.post.description}</span>
                        <button className="text-[#dedede] text-sm">...&nbsp;more</button>
                    </div>
                    <div className="w-3/4 flex text-xs items-center gap-2">
                        <FaMusic />
                        <span className="truncate">Space Song Beach House</span>
                        <span className="flex items-center gap-2">
                            <IoPerson />
                            {reel.post.user.userName}
                        </span>
                    </div>
                </div>
            </div>


        </div>
    </>
};


export default ReelsCard