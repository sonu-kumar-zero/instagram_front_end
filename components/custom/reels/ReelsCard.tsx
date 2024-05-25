"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaPlay, FaPause, FaRegHeart, FaRegBookmark, FaMusic } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoEllipsisHorizontal, IoPerson } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";

interface ReelsCardProps {
    url: string,
    audioPlaying: boolean,
    setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const ReelsCard: React.FC<ReelsCardProps> = ({ url, audioPlaying, setAudioPlaying }) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

    const handleVidoSwitchOnAndOff = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target?.classList.contains("video_overlay_layer")) {
            videoPlaying ? videoRef.current?.pause() : videoRef.current?.play();
            setVideoPlaying((prev) => !prev);
        }
    }


    useEffect(() => {
        const video = videoRef.current;
        if (!videoRef.current) return;
        videoRef.current.muted = true;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoRef?.current?.play();
                    setVideoPlaying(true);
                } else {
                    videoRef?.current?.pause();
                    setVideoPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        });

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, [videoRef, url]);

    useEffect(() => {
        if (videoRef?.current)
            videoRef.current.muted = audioPlaying;
    }, [videoRef, audioPlaying]);

    return <>
        <div className="h-[90dvh] w-fit relative rounded-xl snap-center">
            {/* video component */}
            <video src={url} className="w-full h-full rounded-lg brightness-90" muted ref={videoRef} loop />

            {/* thumbnail component */}
            <Image src={"/images/high/3.jpg"} className="w-full h-full absolute top-0 left-0 blur-xl -z-10" width={200} height={200} alt="blur_post_thumbnail" />

            {/* extra feauture buttons */}
            <div className="flex flex-col gap-6 absolute bottom-0 -right-14 items-center text-xl">
                <button className="flex flex-col items-center">
                    <FaRegHeart />
                    <span className="text-xs">464K</span>
                </button>
                <button className="flex flex-col items-center">
                    <RiMessengerLine />
                    <span className="text-xs">2,377</span>
                </button>
                <button>
                    <FiSend />
                </button>
                <button>
                    <FaRegBookmark />
                </button>
                <button>
                    <IoEllipsisHorizontal />
                </button>
                <Image src={"/images/sonu_profile.jpeg"} width={30} height={30} alt="music_icon" className="w-[30px] h-[30px] rounded object-cover" />
            </div>

            {/* video overlay layer */}
            <div className="w-full h-full p-3 flex flex-col justify-between absolute top-0 left-0 video_overlay_layer bg-[#12121255]" onClick={(e) => {
                handleVidoSwitchOnAndOff(e);
                e.stopPropagation();
            }}>
                <div className="w-full flex justify-end">
                    <button className="bg-[#dedede33] p-2 rounded-full hover:bg-[#dedede66]" onClick={() => setAudioPlaying(prev => !prev)}>
                        {
                            audioPlaying ?
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
                        <Image src={"/images/sonu_profile.jpeg"} className="w-[40px] h-[40px] rounded-full" width={40} height={40} alt="user_profile_img" />
                        <span className=" text-sm">starksonu12</span>
                        <span>•</span>
                        <button className="border border-[#dedede] border-opacity-20 rounded-xl hover:from-pink-500 hover:to-yellow-500 px-2 hover:bg-gradient-to-r">Follow</button>
                    </div>
                    <div className="text-sm flex gap-1 w-2/3">
                        <span className="truncate">Who knows this feeling?😊 I am sonu kumar</span>
                        <button className="text-[#dedede] text-sm">...&nbsp;more</button>
                    </div>
                    <div className="w-3/4 flex text-xs items-center gap-2">
                        <FaMusic />
                        <span className="truncate">Space Song Beach House</span>
                        <span className="flex items-center gap-2">
                            <IoPerson />
                            sonustark12
                        </span>
                    </div>
                </div>
            </div>


        </div>
    </>
};


export default ReelsCard