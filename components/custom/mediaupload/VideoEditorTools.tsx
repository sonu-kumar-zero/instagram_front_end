"use client";
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface VideoEditorProps {
    files: FileList | null;
    currentIdx: number;
    setThumbnailSrc: React.Dispatch<React.SetStateAction<string>>
}

const VideoEditorTools: React.FC<VideoEditorProps> = ({ files, currentIdx, setThumbnailSrc }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const cardVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [frames, setFrames] = useState<string[]>([]);
    const [xPostionOfVideo, setXPositionOfVideo] = useState<number>(0);
    const [currentCardVideoTime, setCurrentCardVideoTime] = useState<number>(0);
    const [videoCardDragging, setVideoCardDragging] = useState(false);
    const fiveCardsBoxRef = useRef<HTMLDivElement>(null);

    const [leftTrimCardDragging, setLeftTrimCardDragging] = useState(false);
    const [rightTrimCardDragging, setRightTrimCardDragging] = useState(false);
    const [leftTrimPosition, setLeftTrimPosition] = useState<number>(0);
    const [rightTrimPosition, setRIghtTrimPosition] = useState<number>(292);
    const trimBoxCardsRef = useRef<HTMLDivElement>(null);
    const trimLeftRef = useRef<HTMLDivElement>(null);
    const trimRightRef = useRef<HTMLDivElement>(null);

    const handleMouseMoveTrim = (e: React.MouseEvent<HTMLDivElement>) => {
        const containerRect = trimBoxCardsRef.current?.getBoundingClientRect();
        if (!containerRect)
            return;
        const newPosition = e.clientX - containerRect.left;
        if (newPosition >= 0 && newPosition <= 292) {
            if (leftTrimCardDragging && leftTrimPosition < rightTrimPosition) {
                setLeftTrimPosition(newPosition);
            } else if (rightTrimCardDragging && leftTrimPosition < rightTrimPosition) {
                setRIghtTrimPosition(newPosition);
            }
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setVideoCardDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoCardDragging) return;
        const containerRect = fiveCardsBoxRef?.current?.getBoundingClientRect();
        if (containerRect) {
            const newPosition = e.clientX - containerRect.left - 30;
            console.log(newPosition);
            if (newPosition >= 0 && newPosition <= 270) {
                if (newPosition > 239)
                    setXPositionOfVideo(239);
                else
                    setXPositionOfVideo(newPosition);
            };
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        setVideoCardDragging(false);
        setLeftTrimCardDragging(false);
        setRightTrimCardDragging(false);
    };

    const extractThumbnail = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !files) return;

        if (frames.length === 0)
            return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        const file = files[currentIdx];
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = async () => {
            await video.play();
            video.pause();

            if (!currentCardVideoTime) {
                video.currentTime = 0;
            } else {
                video.currentTime = currentCardVideoTime;
            }

            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            setThumbnailSrc(canvas.toDataURL('image/png'));

            URL.revokeObjectURL(url);
        }
    }, [files, currentIdx, currentCardVideoTime, setThumbnailSrc, frames]);

    const extractFrames = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !files) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const file = files[currentIdx];
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = async () => {
            await video.play();
            video.pause();

            const frameImages: string[] = [];
            const interval = video.duration / 5;

            video.currentTime = 0;
            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            frameImages.push(canvas.toDataURL('image/png'));

            for (let i = 1; i < 4; i++) {
                video.currentTime = interval * i;
                await new Promise((resolve) => setTimeout(resolve, 300));

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                frameImages.push(canvas.toDataURL('image/png'));
            };

            video.currentTime = video.duration;
            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            frameImages.push(canvas.toDataURL('image/png'));
            console.log({ frameImages });
            setFrames(frameImages);
            URL.revokeObjectURL(url);
        };
    }, [files, currentIdx]);

    useEffect(() => {
        if (cardVideoRef.current && currentCardVideoTime)
            cardVideoRef.current.currentTime = currentCardVideoTime;
    }, [currentCardVideoTime]);

    useEffect(() => {
        const currentTimeChangerOfVideo = () => {
            if (!cardVideoRef.current)
                return;
            setCurrentCardVideoTime(Math.floor((xPostionOfVideo / 239) * cardVideoRef.current.duration));
        };
        currentTimeChangerOfVideo();
    }, [xPostionOfVideo]);

    useEffect(() => {
        extractThumbnail();
    }, [extractThumbnail]);

    useEffect(() => {
        extractFrames();
    }, [extractFrames]);

    useEffect(() => {
        if (!files)
            return;
        if (!cardVideoRef.current)
            return;
        const url = URL.createObjectURL(files[currentIdx]);
        cardVideoRef.current.src = url;
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [files, currentIdx, cardVideoRef]);

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    return (
        <div className='w-full border-l h-[72dvh] border-[#454545] rounded-br-xl px-5 flex flex-col bg-[#232323]' >
            {/* thumbnail component */}
            <div className="pt-7 flex justify-between items-center">
                <div className="font-bold text-base">Cover photo</div>
                <button className="text-[#0095f6]">Select from computer</button>
            </div>
            <div className='flex justify-center pt-5'>
                <video ref={videoRef} className='hidden' />
                <canvas ref={canvasRef} width="1080" height="1920" className='hidden' />
                {
                    <div className='relative rounded-md '>
                        <div
                            ref={fiveCardsBoxRef}
                            className='flex flex-wrap w-[300px]'
                            onMouseMove={handleMouseMove}
                        >
                            {
                                frames.map((frame, index) => (
                                    <div key={index}  >
                                        <Image
                                            width={1080}
                                            height={1920}
                                            className={`w-[60px] h-[84px] ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md" : ""}`}
                                            src={frame}
                                            alt={`Frame ${index}`} />
                                    </div>
                                ))
                            }
                            {
                                frames.length === 0 && <div className="h-[84px]">&nbsp;</div>
                            }
                        </div>
                        <div className="absolute top-0 left-0 z-10 w-[60px] h-[84px] border border-[#fff] rounded-md shadow cursor-grab"
                            style={{
                                left: `${xPostionOfVideo}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                        >
                            <video ref={cardVideoRef} className='w-full h-full rounded-md object-cover' />
                        </div>
                    </div>
                }
            </div>

            {/* trim component */}
            <div className="pt-7 flex items-center">
                <div className="font-bold text-base">Trim video</div>
            </div>
            <div className='flex justify-center pt-5'>
                {
                    <div className='relative rounded-md '>
                        <div
                            ref={trimBoxCardsRef}
                            className='flex flex-wrap w-[300px]'
                            onMouseMove={handleMouseMoveTrim}
                        >
                            {frames.length > 0 ?
                                frames.map((frame, index) => (
                                    <div key={index}  >
                                        <Image
                                            width={1080}
                                            height={1920}
                                            className={`w-[60px] h-[84px] ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md" : ""}`}
                                            src={frame}
                                            alt={`Frame ${index}`} />
                                    </div>
                                )) : <div className='h-[84px]'>&nbsp;</div>}
                        </div>
                        <div
                            className="absolute top-0 left-0 z-10 w-[0px] h-[84px] 
                            bg-[#232323aa] rounded-l-md shadow"
                            style={{
                                width: `${leftTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                        <div
                            ref={trimLeftRef}
                            className="absolute top-0 left-0 z-10 w-[8px] h-[84px] 
                            border border-[#dedede] bg-[#232323] rounded-l-xl shadow cursor-row-resize"
                            style={{
                                left: `${leftTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={
                                () => {
                                    setLeftTrimCardDragging(true);
                                    setRightTrimCardDragging(false);
                                }
                            }
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                        <div
                            ref={trimRightRef}
                            className="absolute top-0 right-0 z-10 w-[8px] h-[84px] 
                            border border-[#dedede] bg-[#232323] rounded-r-xl shadow cursor-row-resize"
                            style={{
                                left: `${rightTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={
                                () => {
                                    setRightTrimCardDragging(true);
                                    setLeftTrimCardDragging(false);
                                }
                            }
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                        <div
                            className="absolute top-0 right-0 z-10 w-[0px] h-[84px] 
                             bg-[#232323aa] rounded-r-md shadow"
                            style={{
                                width: `${292 - rightTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                    </div>
                }
            </div>

            <div className="pt-7 flex justify-between items-center">
                <div className="">Sound On</div>
                <div className="">
                    <label className="switch">
                        <input type="checkbox" checked={true} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

        </div>
    );
};

export default VideoEditorTools;