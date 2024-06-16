"use client";
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageCanvas from "@/components/custom/mediaupload/ImageCanvas";
import ImageCanvasUploader from '@/components/custom/mediaupload/ImageCanvasUploader';
import axios from 'axios';
import { useUserState } from '@/context/userContext';
import { handlePostUpload } from '@/utils/apiCallHalder';

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
    type: string;
    DEFAULT_OPTIONS: DefaultOption[];
}

interface ArrayOfUrlObjects {
    idx: number;
    url: string;
    type: string;
}

const DEFAULT_OPTIONS: DefaultOption[] = [
    {
        name: "Brightness",
        property: "brightness",
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: "%",
        defaultValue: 100
    },
    {
        name: "Contrast",
        property: "contrast",
        value: 100,
        defaultValue: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: "%"
    },
    {
        name: "Saturation",
        property: "saturate",
        value: 100,
        defaultValue: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: "%"
    },
    {
        name: "Grayscale",
        property: "grayscale",
        value: 0,
        defaultValue: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: "%"
    },
    {
        name: "Sepia",
        property: "sepia",
        value: 0,
        defaultValue: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: "%"
    },
    {
        name: "Hue Rotate",
        property: "hue-rotate",
        value: 0,
        defaultValue: 0,
        range: {
            min: 0,
            max: 360
        },
        unit: "deg"
    },
    {
        name: "Blur",
        property: "blur",
        value: 0,
        defaultValue: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: "px"
    },
    {
        name: "Vignette",
        property: "vignette",
        value: 0,
        defaultValue: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: "px"
    }
]

interface ImageUploaderProps {
    setUploadBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setUploadBoxEnabled }) => {
    const inputRef = useRef(null);
    const userState = useUserState();
    const user = userState ? userState.user : null;
    const [canvasImageSrc, setCanvasImageSrc] = useState<string | ArrayBuffer | null | undefined>(null);
    const [mediaSelected, setMediaSelected] = useState(false);
    const [draggingStart, setDraggingStart] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [currentZoomValue, setCurrentZoomValue] = useState(1);
    const [currentFilters, setCurrentFilters] = useState("");
    const [editingTool, setEditingTool] = useState(false);
    const [uploadingTool, setUploadingTool] = useState(false);
    const [filtersEditOptionsOpen, setFilterEditOptionsOpen] = useState(true);
    const [files, setFiles] = useState<FileList | null>(null);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [propertList, setPropertList] = useState<Property[]>([]);
    const [postDescription, setPostDescription] = useState("");

    const handleImageSelection = () => {
        const current = inputRef.current as HTMLInputElement | null;
        if (current) {
            setMediaSelected(true);
            setFiles(current.files);
        }
    };

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(true);
    };


    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(true);
    }


    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(false);
        if (e.dataTransfer.files && !editingTool && !uploadingTool) {
            setMediaSelected(true);
            setFiles(() => e.dataTransfer.files);
        };
    };

    function getMediaType(mediaType: string): string {
        if (mediaType.startsWith('video/'))
            return 'VIDEO';
        else
            return 'IMAGE';
    }

    const initializePropertyList = useCallback((fileList: FileList) => {
        const newList = Array.from(fileList).map((file) => ({
            scale: 1,
            type: getMediaType(file.type),
            DEFAULT_OPTIONS: DEFAULT_OPTIONS
        }));
        console.log(newList);
        setPropertList(newList);
    }, []);

    useEffect(() => {
        if (files) {
            initializePropertyList(files);
        }
    }, [files, initializePropertyList]);

    const handleEveryThing = (e: React.MouseEvent<HTMLDivElement>) => {
        // e.preventDefault();
        setZoomVisible(false);
    }

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const newScale = (Number(e.target.value) + 100) / 100;

        setPropertList(prev =>
            prev.map((item, index) =>
                index === currentIdx ? { ...item, scale: newScale } : item
            )
        );
    };

    useEffect(() => {
        if (propertList.length > 0)
            setCurrentZoomValue((prev) => (propertList[currentIdx].scale));
    }, [currentIdx, propertList]);

    const getBackgroundImage = () => {
        if (files && files[currentIdx]) {
            try {
                return `url(${URL.createObjectURL(files[currentIdx])})`;
            } catch (error) {
                console.error("Failed to create object URL", error);
                return "";
            }
        }
        return "";
    };

    const handleDefaultPropertyChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertList((prev) => {
            return prev.map((property, idx) => {
                if (idx === currentIdx) {
                    return {
                        ...property,
                        DEFAULT_OPTIONS: property.DEFAULT_OPTIONS.map(opt =>
                            opt.property === name ? { ...opt, value: Number(value) } : opt
                        )
                    };
                }
                return property;
            });
        })
    };

    useEffect(() => {
        if (files?.length) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCanvasImageSrc(e.target?.result);
            };
            reader.readAsDataURL(files[currentIdx]);
        }
    }, [currentIdx, canvasImageSrc, files]);

    const handleValueReset = (index: number) => {
        setPropertList((prev) => {
            return prev.map((property, idx) => {
                if (idx === currentIdx) {
                    return {
                        ...property,
                        DEFAULT_OPTIONS: property.DEFAULT_OPTIONS.map((opt, optIdx) =>
                            optIdx === index ? { ...opt, value: opt.defaultValue } : opt
                        )
                    };
                }
                return property;
            });
        });
    };


    useEffect(() => {
        const currentFilterOfImage = () => {
            if (propertList.length < 0)
                return;
            const filters = propertList[currentIdx]?.DEFAULT_OPTIONS.map(
                (option) => {
                    if (option.name === "Vignette") return "";
                    return `${option.property}(${option.value}${option.unit})`;
                }
            );

            const filter = filters?.join(" ");
            if (filter)
                setCurrentFilters(filter);
        };
        currentFilterOfImage();
    }, [currentIdx, files, propertList]);


    return (
        <>
            <div
                onDragOver={handleOnDragOver}
                onDrag={handleOnDrag}
                onDrop={handleOnDrop}
                onClick={handleEveryThing}
                className="absolute top-0 left-0 z-10 w-[100dvw] h-[100dvh] flex justify-center items-center bg-[#28282888]"
            >
                <div
                    className={`bg-[#282828] w-[90dvw] ${editingTool || uploadingTool ? "max-w-[950px]" : "max-w-[580px]"} h-[78dvh] rounded-xl flex flex-col`}
                >
                    <div className="w-full h-[6dvh] text-xl flex justify-center items-center border-b border-[#454545] font-semibold">
                        {
                            mediaSelected ?
                                <>
                                    <div className="flex justify-between w-full px-5 pr-3 text-base items-center">
                                        <button className=""
                                            onClick={
                                                (e) => {
                                                    // setEditingTool(false);
                                                    if (uploadingTool) {
                                                        setUploadingTool(false);
                                                        setEditingTool(true);
                                                    } else if (editingTool) {
                                                        setEditingTool(false);
                                                        setUploadingTool(false);
                                                    }
                                                }
                                            }>
                                            <svg aria-label="Back" className="" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                <title>Back</title>
                                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                                                <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                            </svg>
                                        </button>
                                        <div className="">
                                            {
                                                uploadingTool ? "Upload" : "Edit"
                                            }
                                        </div>
                                        <button className="text-[#0095f6] px-2 py-1" onClick={
                                            () => {
                                                if (editingTool) {
                                                    setEditingTool(false);
                                                    setUploadingTool(true);
                                                } else {
                                                    setEditingTool(true);
                                                    setUploadingTool(false);
                                                }
                                            }
                                        }>{
                                                uploadingTool ? " " :
                                                    "Next"
                                            }</button>
                                    </div>
                                </> : "Create New Post"
                        }
                    </div>
                    {
                        !mediaSelected &&
                        <div className={`h-full w-full flex justify-center items-center ${draggingStart ? "bg-[#212121]" : ""}`}>
                            <div className="flex flex-col gap-5 items-center">
                                <div className="">
                                    <svg
                                        aria-label="Icon to represent media such as images or videos"
                                        className="x1lliihq x1n2onr6 x5n08af"
                                        fill="currentColor"
                                        height="77"
                                        role="img"
                                        viewBox="0 0 97.6 77.3"
                                        width="96">
                                        <title>Icon to represent media such as images or videos</title>
                                        <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                        <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                        <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div className="text-xl">Drag photos and videos here</div>
                                <button className="bg-[#0095f6] px-3 py-2 rounded-md"
                                    onClick={
                                        (e) => {
                                            const current = inputRef.current as HTMLInputElement | null;
                                            current?.click();
                                        }
                                    }>Select From Computer</button>
                            </div>
                            <form >
                                <label htmlFor='image_input'>
                                </label>

                                <input
                                    name='image_input'
                                    title="image_input"
                                    ref={inputRef}
                                    type='file'
                                    accept="
                            image/jpeg,
                            image/png,
                            image/heic,
                            image/heif,
                            video/mp4,
                            video/quicktime"
                                    hidden
                                    multiple
                                    onChange={handleImageSelection}
                                />
                            </form>
                        </div>
                    }
                    {
                        !uploadingTool && !editingTool && mediaSelected && files && propertList.length > 0
                        && <>
                            <div className={`h-[72dvh] w-full relative`}>
                                <div className="h-[72dvh] w-[580px] overflow-hidden rounded-b-xl">
                                    <div className={`h-[72dvh] w-[580px] object-contain rounded-b-xl overflow-hidden zoomImage`}
                                        style={{
                                            backgroundImage: getBackgroundImage(),
                                            transform: `scale(${currentZoomValue})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            height: "72dvh",
                                            width: "580px",
                                            filter: currentFilters
                                        }}>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full flex justify-between items-center p-3">
                                    <div className="flex items-center gap-5">
                                        <button className="bg-[#121212aa] p-3 rounded-full">
                                            <svg
                                                aria-label="Select crop"
                                                className="x1lliihq x1n2onr6 x9bdzbf"
                                                fill="currentColor"
                                                height="16"
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width="16"
                                            >
                                                <title>Select crop</title>
                                                <path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z">
                                                </path>
                                            </svg>
                                        </button>
                                        <div className="relative">
                                            <button className="bg-[#121212aa] p-3 rounded-full" onClick={(e) => {
                                                setZoomVisible(true);
                                                e.stopPropagation();
                                            }}>
                                                <svg
                                                    aria-label="Select zoom"
                                                    className="x1lliihq x1n2onr6 x9bdzbf"
                                                    fill="currentColor"
                                                    height="16"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    width="16"
                                                >
                                                    <title>Select zoom</title>
                                                    <path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z">
                                                    </path>
                                                </svg>
                                            </button>
                                            {
                                                zoomVisible &&
                                                <div className="absolute -top-10 left-0 bg-[#121212aa] px-2 rounded-xl flex items-center py-4">
                                                    <input type="range" id="zoom" name="zoom" min="0" max="100" step="5" className='p-0 h-1 m-0 bg-white range-input appearance-none rounded-xl focus:outline-none cursor-pointer' value={propertList[currentIdx].scale * 100 - 100}
                                                        onChange={handleZoomChange}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <button className="bg-[#121212aa] p-3 rounded-full">
                                        <svg
                                            aria-label="Open media gallery"
                                            className=""
                                            fill="currentColor"
                                            height="16"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="16"
                                        >
                                            <title>Open media gallery</title>
                                            <path d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z" fillRule="evenodd">
                                            </path>
                                        </svg>
                                    </button>
                                </div>


                                <div className="flex gap-2 absolute bottom-6 left-1/2 -translate-x-1/2">
                                    {
                                        Array.from({ length: files.length }).map((opt, index) => {
                                            return (
                                                <div className={`w-[7px] h-[7px] rounded-full ${index === currentIdx ? "bg-[#0095f6]" : "bg-[#dedede77]"}`} key={index}>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                {
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
                    }
                    {
                        editingTool
                        && (
                            <>
                                <div className="w-[90dvw] max-w-[950px] h-[72dvh] flex rounded-b-xl">

                                    {/* canvas */}
                                    <ImageCanvas imageSrc={canvasImageSrc} currentIdx={currentIdx} propertList={propertList} files={files} setCurrentIdx={setCurrentIdx} />

                                    <div className="w-full border-l border-[#454545] rounded-br-xl overflow-y-scroll">
                                        <div className="grid grid-cols-2 border-b border-[#454545]">
                                            <button
                                                className={
                                                    `font-semibold border-b ${filtersEditOptionsOpen ? "text-[#dedede] border-[#dedede]" : "text-[#dedede77] border-transparent"} text-[#dedede77] py-2`
                                                }
                                                onClick={() => { setFilterEditOptionsOpen(true) }}
                                            >Filters</button>
                                            <button
                                                className={
                                                    `font-semibold border-b ${!filtersEditOptionsOpen ? "text-[#dedede] border-[#dedede]" : "text-[#dedede77] border-transparent"} text-[#dedede77] py-2`
                                                }
                                                onClick={() => { setFilterEditOptionsOpen(false) }}
                                            >Adjustments</button>
                                        </div>
                                        {
                                            filtersEditOptionsOpen && (
                                                <div>
                                                    <div className="grid grid-cols-3 gap-3 p-3">
                                                        {
                                                            Array.from({ length: 11 }).map((o, index) => {
                                                                return (
                                                                    <div key={index} className='flex flex-col gap-1 cursor-pointer'>
                                                                        <div className="">
                                                                            <Image src={"/images/sonu_profile.jpeg"} alt='filter_image' width={100} height={100} className='w-full h-full object-cover rounded-xl' />
                                                                        </div>
                                                                        <div className="flex justify-center text-sm">Style Name</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="px-5 py-3">
                                                        <input type="range" name="" id="" min={0} max={100} value={100} className='w-full' readOnly />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            !filtersEditOptionsOpen && (
                                                <>
                                                    <div className="px-5 py-3">
                                                        {
                                                            DEFAULT_OPTIONS.map((opt, index) => {
                                                                return (
                                                                    <div className="py-3 flex flex-col gap-2" key={index}>
                                                                        <div className="flex justify-between">
                                                                            <div className="font-semibold text-[#dedede]">{opt.name}</div>
                                                                            <div className="">
                                                                                {
                                                                                    propertList[currentIdx].DEFAULT_OPTIONS[index].value !== opt.defaultValue &&
                                                                                    <button className='text-[#0095f6]' onClick={() => { handleValueReset(index) }}>Reset</button>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <input type="range" name={opt.property} id="" max={opt.range.max} min={opt.range.min} value={propertList[currentIdx].DEFAULT_OPTIONS[index].value} className='w-full cursor-pointer' onChange={handleDefaultPropertyChanger} />
                                                                            <div className="w-[36px] flex justify-center">{propertList[currentIdx].DEFAULT_OPTIONS[index].value}</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        uploadingTool && (
                            <>
                                <div className="w-[90dvw] max-w-[950px] h-[72dvh] flex rounded-b-xl">
                                    <ImageCanvasUploader currentIdx={currentIdx} files={files} setCurrentIdx={setCurrentIdx} imageSrc={canvasImageSrc} propertList={propertList} postDescription={postDescription} />

                                    <div className="px-5 rounded-br-xl border-l border-[#454545]">
                                        <div className="flex py-3 gap-2 items-center">
                                            <Image src={user ? `http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/300_300.jpg` : "/images/sonu_profile.jpeg"} alt='profile_icon' width={100} height={100} className='w-[30px] h-[30px] object-cover rounded-full' />
                                            <div className="text-sm font-semibold">{user ? user.userName:"userName"}</div>
                                        </div>
                                        <textarea value={postDescription} onChange={
                                            (e) => {
                                                setPostDescription(e.target.value);
                                            }
                                        } rows={6} placeholder={"Write a caption..."} className='outline-none bg-transparent w-full resize-none' />
                                        <div className="text-lg font-semibold py-2">Advanced Settings</div>
                                        <div className="flex gap-3 pb-1 items-center justify-between">
                                            <div className="font-medium">
                                                Hide like and view Counts on this post
                                            </div>
                                            <div className="">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#676767] ">
                                            Only you will see the total number of likes and views on this post. You can change this later by going to ... menu at the top of post. To hide like counts on other people&apos;s posts,go to your account settings.
                                        </div>
                                        <div className="flex gap-3 pt-3 pb-1 items-center justify-between">
                                            <div className="font-medium">
                                                Turn off commenting
                                            </div>
                                            <div className="">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#676767]  ">
                                            You can change this later by going to the ... menu at the top of your post.
                                        </div>
                                        <div className="flex justify-end py-5">
                                            <button className='bg-[#0095f6] px-5 py-2 rounded-xl' onClick={() => { handlePostUpload({ user, files, propertList, postDescription }) }}>Upload Post</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <button className="absolute top-5 right-5 z-10 text-2xl px-5 py-3 shadow shadow-[#343434] hover:border-[#454545] rounded-md border border-transparent" onClick={() => { setUploadBoxEnabled(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#dedede" width="40px" height="40px" viewBox="0 0 32 32">
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
            </button>
        </>
    )
}

export default ImageUploader