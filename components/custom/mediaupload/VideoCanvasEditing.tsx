"use client";
import React, { useEffect, useRef, useState } from 'react'
import VideoEditorTools from './VideoEditorTools'
import Image from 'next/image';

interface VideoCanvasEditingProps {
  files: FileList | null;
  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

const VideoCanvasEditing: React.FC<VideoCanvasEditingProps> = (
  {
    files, currentIdx, setCurrentIdx
  }
) => {
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");

  useEffect(() => {
    if (!currentVideoRef.current)
      return;
    isVideoPlaying ? currentVideoRef.current.play() : currentVideoRef.current.pause();
  }, [isVideoPlaying]);

  return (
    <>
      <div className="relative">
        <div className="h-[72dvh] w-[580px] aspect-w-9 aspect-h-16 object-contain rounded-bl-xl" >
          {
            files && (
              isVideoPlaying
                ? <video className='w-full h-full object-contain' ref={currentVideoRef} onClick={() => {
                  setIsVideoPlaying(false);
                }}>
                  <source src={URL.createObjectURL(files[currentIdx])} />
                </video>
                :
                thumbnailSrc !== "" &&
                <Image className="w-full h-full object-contain rounded-bl-xl" alt='thumbnail' src={thumbnailSrc} width={1080} height={1920} onClick={() => {
                  setIsVideoPlaying(true);
                }} />
            )
          }
        </div>
        {
          files &&
          currentIdx < files.length - 1 &&
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button className='bg-[#121212aa] p-3 rounded-full' onClick={
              () => setCurrentIdx((prev) => {
                if (prev < files.length - 1) {
                  return prev + 1;
                };
                return prev;
              })}>
              <svg aria-label="Right chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Right chevron</title><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
            </button>
          </div>
        }
        {
          files &&
          currentIdx > 0 && currentIdx < files.length &&
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <button className='bg-[#121212aa] p-3 rounded-full' onClick={
              () => setCurrentIdx((prev) => {
                if (prev > 0) {
                  return prev - 1;
                };
                return prev;
              })}>
              <svg aria-label="Left chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Left chevron</title><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
            </button>
          </div>
        }
      </div>
      <VideoEditorTools files={files} currentIdx={currentIdx} setThumbnailSrc={setThumbnailSrc} />
    </>
  )
}

export default VideoCanvasEditing
