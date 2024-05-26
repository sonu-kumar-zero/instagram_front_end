import React from 'react';
import Image from 'next/image';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { RiMessengerLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";

interface PostDisplayerProps {
    url: string,
    setPostDisplayerOn: React.Dispatch<React.SetStateAction<boolean>>
};

const CommentBoxBar = () => {
    return <>
        <div className="flex gap-3 p-3 item-start">
            <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt="post" className="w-[40px] h-[40px] object-cover rounded-full" />
            <div className="flex flex-col gap-3">
                <div className="break-all text-sm">
                    <span className="font-semibold">starksonu12 </span>
                    Loremipsum,dolorsitametconsecteturadipisicingelit. Necessitatibus ipsumquaeratsuntquasinisisapientedolorrationeetullam veritatis, voluptates obcaecati, ex eum, culpa error omnis placeat officia doloribus dolorum minus odit provident? Ab blanditiis consectetur assumenda magnam aperiam doloribus dolorum, fugiat atque facilis tempore reiciendis nesciunt!
                </div>
                <div className="flex gap-3 text-xs">
                    <button className="hover:text-[#dedede] text-[#dedededd]">23w</button>
                    <button className="hover:text-[#dedede] text-[#dedededd]">3 likes</button>
                    <button className="hover:text-[#dedede] text-[#dedededd]">Reply</button>
                </div>
            </div>
            <button className="pt-3 h-fit">
                <FaRegHeart />
            </button>
        </div>
    </>
}

const PostDisplayer: React.FC<PostDisplayerProps> = ({ url, setPostDisplayerOn }) => {
    return (
        <>
            <div className="absolute top-0 left-0 z-50 w-[100dvw] h-[100dvh] bg-[#12121288] px-40 py-5 rounded-xl main_box_post_displayer" onClick={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.classList.contains("main_box_post_displayer")) {
                    setPostDisplayerOn(false);
                };
            }}>
                <div className="flex w-full h-full">
                    <div className="w-3/5 h-full">
                        <Image src={url} width={500} height={500} alt="post" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/5 bg-[#090909] border-l-1 h-full flex flex-col">
                        {/*profile box */}
                        <div className="flex justify-between p-3 border-b gap-3">
                            <div className="flex items-center gap-3">
                                <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt="post" className="w-[40px] h-[40px] object-cover rounded-full" />
                                <div className="text-[14px] font-medium flex gap-1">
                                    <div className="cursor-pointer text-[#dedede] hover:text-[#dedede77]">7billionairesline</div>
                                    <div className="cursor-default">•</div>
                                    <button className="text-[#00bfffbb] font-semibold hover:text-[#dedede]">Follow</button>
                                </div>
                            </div>
                            <button className='text-xl py-2 px-2 hover:text-[#898989] hover:font-bold text-[#dedede]'>
                                <IoEllipsisHorizontal />
                            </button>
                        </div>


                        {/*all comment box  */}
                        <div className="h-full w-full overflow-y-scroll remove_scroll_bar flex flex-col gap-1">
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                            <CommentBoxBar />
                        </div>

                        {/* info box */}
                        <div className="flex flex-col gap-3 p-3 border-t">
                            <div className="flex text-2xl justify-between">
                                <div className="flex gap-3">
                                    <button><FaRegHeart /></button>
                                    <button><RiMessengerLine /></button>
                                    <button><FiSend /></button>
                                </div>
                                <div className="">
                                    <button><FaRegBookmark /></button>
                                </div>
                            </div>

                            <div className="">
                                <div className=''>Liked by <span className='font-medium'>starksonu12</span> and <span className='font-medium'>10,201 Others</span></div>
                                <div className='text-[#dedede77] text-xs'>May 24, 2024</div>
                            </div>

                        </div>

                        {/* input comment */}
                        <div className="p-3 border-t w-full flex gap-3">
                            <GrEmoji size={32} />
                            <input placeholder='Add a comment...' className='w-full outline-none bg-[#090909] text-[#dedededd]' />
                            <button className='text-[#00bfffbb] font-semibold hover:text-[#dedede]'>Post</button>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
            <button className="absolute top-5 right-5 z-50 rounded-full cursor-pointer hover:bg-[#23232355] p-3" onClick={() => { setPostDisplayerOn(false) }}>
                <RxCross2 size={60} />
            </button>
        </>
    )
}

export default PostDisplayer