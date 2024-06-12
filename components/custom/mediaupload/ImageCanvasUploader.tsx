"use client";

import React, { useEffect, useRef } from 'react';


interface DefaultOption {
    name: string;
    property: string;
    value: number;
    range: {
        min: number;
        max: number;
    };
    unit: string;
    defaultValue: number;
}

interface Property {
    scale: number;
    DEFAULT_OPTIONS: DefaultOption[];
}

interface ImageCanvasUploaderProps {
    files: FileList | null;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
    imageSrc: string | ArrayBuffer | null | undefined;
    propertList: Property[];
    postDescription: string
};



const ImageCanvasUploader: React.FC<ImageCanvasUploaderProps> = ({ imageSrc, propertList, files, currentIdx, setCurrentIdx, postDescription }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;
        if (imageSrc && typeof (imageSrc) === "string") {
            const img = new Image();

            img.onload = () => {
                const canvasAspectRatio = canvas.width / canvas.height;
                const imageAspectRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;
                const scale = propertList[currentIdx].scale;

                if (canvasAspectRatio > imageAspectRatio) {
                    drawWidth = canvas.width * scale;
                    drawHeight = drawWidth / imageAspectRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height * scale;
                    drawWidth = drawHeight * imageAspectRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                const filters = propertList[currentIdx].DEFAULT_OPTIONS.map(
                    (option) => {
                        if (option.name === "Vignette") return "";
                        return `${option.property}(${option.value}${option.unit})`;
                    }
                );

                const filter = filters.join(" ");

                const radialGradient = ctx.createRadialGradient(
                    canvas.width / 2,
                    canvas.height / 2,
                    0,
                    canvas.width / 2,
                    canvas.height / 2,
                    Math.abs(Math.max(canvas.width, canvas.height) / 2)
                );

                radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                radialGradient.addColorStop(1, `rgba(0, 0, 0, ${propertList[currentIdx].DEFAULT_OPTIONS[7].value / 100})`);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = filter;
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                ctx.fillStyle = radialGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

            };
            img.src = imageSrc;
        }

    }, [imageSrc, canvasRef, currentIdx, propertList]);



    const handleSendToServer = async () => {
        // const canvas = canvasRef.current;
        // if (canvas && files) {
        //     for (const file of Array.from(files)) {
        //         const ctx = canvas.getContext('2d');
        //         const img = new Image();
        //         const url = URL.createObjectURL(file);
        //         img.src = url;
        //         await new Promise<void>((resolve) => {
        //             img.onload = () => {
        //                 ctx?.clearRect(0, 0, canvas.width, canvas.height);
        //                 ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        //                 URL.revokeObjectURL(url);
        //                 canvas.toBlob(async (blob) => {
        //                     if (blob) {
        //                         const formData = new FormData();
        //                         formData.append('image', blob, 'canvas-image.png');
        //                         await fetch('/api/upload', {

        //                             method: 'POST',
        //                             body: formData,
        //                         });
        //                     }
        //                     resolve();
        //                 }, 'image/png');
        //             };
        //         });
        //     }
        // }
    };


    return (
        <>
            <div className="relative">
                <canvas ref={canvasRef} width={1080} height={1080} className='w-[580px] h-[72dvh] rounded-bl-xl' />
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
        </>
    )
}

export default ImageCanvasUploader
