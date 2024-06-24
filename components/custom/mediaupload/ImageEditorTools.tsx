"use client";
import { DEFAULT_OPTIONS } from '@/data/filtersList';
import Image from 'next/image';
import React, { useState } from 'react'

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

interface ImageEditorToolsProps {
    propertList: Property[];
    currentIdx: number;
    setPropertList: React.Dispatch<React.SetStateAction<Property[]>>;
}

const ImageEditorTools: React.FC<ImageEditorToolsProps> = ({  propertList, currentIdx, setPropertList }) => {

    const [filtersEditOptionsOpen, setFilterEditOptionsOpen] = useState(true);


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

    return (
        <>
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
                                                            <button className='text-[#0095f6]' onClick={
                                                                () => {
                                                                    handleValueReset(index)
                                                                }
                                                            }>Reset</button>
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
        </>
    )
}

export default ImageEditorTools
