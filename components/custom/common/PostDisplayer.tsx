"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { RiMessengerLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import { timeDifference } from '@/utils/dataManipulator';
import axios from 'axios';
import { useUserState } from '@/context/userContext';

interface PostUrl {
    id: string;
    postId: string;
    url: string;
    index: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    userName: string;
    name: string | null;
    imageUrl: string | null;
    postsCount: number;
    followerCount: number;
    followingCount: number;
    bio: string | null;
    id: string;
}

interface Post {
    id: string;
    userId: string;
    description: string;
    likesCount: number;
    commentCount: number;
    viewsCount: number;
    postUrlCount: number;
    typeOfPost: string;
    isCommentEnable: boolean;
    isLikeVisible: boolean;
    createdAt: string;
    updatedAt: string;
    postUrls: PostUrl[];
    user: User;
}

interface Comment {
    id: string;
    postId: string;
    userId: string;
    commentText?: string | null;
    commentCount: number;
    likesCount: number;
    commentType: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

interface PostDisplayerProps {
    url: string,
    setPostDisplayerOn: React.Dispatch<React.SetStateAction<boolean>>,
    post?: Post
};

interface UserCommentBoxBarProps {
    post: Post
}
interface CommentBoxBarProps {
    comment: Comment
}

const CommentBoxBar: React.FC<CommentBoxBarProps> = ({ comment }) => {
    const [commentBoxBarTimeString, setCommentBoxBarTimeString] = useState<string>("");

    useEffect(() => {
        const updatedAt: Date = new Date(comment.updatedAt);
        const now: Date = new Date();
        const diffMs: number = now.getTime() - updatedAt.getTime();
        setCommentBoxBarTimeString(timeDifference(diffMs));
    }, [comment]);

    return (
        <>
            <div className="flex gap-3 p-3 items-start w-full justify-between">
                <div className="flex gap-3">
                    <div className="min-w-[40px] h-[40px]">
                        <Image
                            src={`http://127.0.0.1:8000/uploads/profile/${comment.user.imageUrl}/100_100.jpg`}
                            width={40}
                            height={40}
                            alt="post"
                            className="w-[40px] h-[40px] object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="break-all text-sm">
                            <span className="font-semibold">{comment.user.userName}</span>
                            <pre className="break-all whitespace-pre-wrap">
                                {comment.commentText}
                            </pre>
                        </div>
                        <div className="flex gap-3 text-xs">
                            <button className="hover:text-gray-400 text-gray-500">{commentBoxBarTimeString}</button>
                            <button className="hover:text-gray-400 text-gray-500">{comment.likesCount} likes</button>
                            <button className="hover:text-gray-400 text-gray-500">Reply</button>
                        </div>
                    </div>
                </div>
                <button className="pt-3 h-fit pr-2">
                    <FaRegHeart />
                </button>
            </div>
        </>
    )
}

const UserCommentBoxBar: React.FC<UserCommentBoxBarProps> = ({ post }) => {
    const [timeStringToShown, setTimeStringToShown] = useState<string>("");


    useEffect(() => {
        const updatedAt: Date = new Date(post.createdAt);
        const now: Date = new Date();
        const diffMs: number = now.getTime() - updatedAt.getTime();
        setTimeStringToShown(timeDifference(diffMs));
    }, [post]);

    return (
        <>
            <div className="flex gap-3 p-3 item-start">
                <div className="flex gap-3">
                    <div className="min-w-[40px] h-[40px]">
                        <Image
                            src={`http://127.0.0.1:8000/uploads/profile/${post.user.imageUrl}/100_100.jpg`}
                            width={40} height={40} alt="post"
                            className="w-[40px] h-[40px] object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="break-all text-sm">
                            <span className="font-semibold">{post.user.userName} </span>
                            <pre className="break-all whitespace-pre-wrap">
                                {post.description}
                            </pre>
                        </div>
                        <div className="flex gap-3 text-xs">
                            <button className="hover:text-[#dedede] text-[#dedededd]">Edited • {timeStringToShown}</button>
                        </div>
                    </div>
                </div>
                <div className="pt-3 h-fit w-[20px]">
                    &nbsp;
                </div>
            </div>
        </>
    )
}

const PostDisplayer: React.FC<PostDisplayerProps> = ({ url, setPostDisplayerOn, post }) => {
    const userStates = useUserState();
    const user: User | null = userStates ? userStates.user : null;
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [localTimeString, setLocalTimeString] = useState<string>("");
    const postContainerRef = useRef<HTMLDivElement>(null);
    const [allCommentsOfPosts, setAllCommentsOfPosts] = useState<Comment[]>([]);
    const [userCommentString, setUserCommentString] = useState<string>("");


    const fetchAllCommentsOfGivenPostId = useCallback(async () => {
        if (!post)
            return;
        const allCommentsOfPostsResponse = await axios.get(
            `http://localhost:4000/api/upload/post/comment/${post.id}`
        );
        if (allCommentsOfPostsResponse.status === 200) {
            setAllCommentsOfPosts(allCommentsOfPostsResponse.data.comments);
        }
    }, [post]);

    const sendCommentOnPost = async () => {
        try {
            if (!user || !post)
                return;
            if(userCommentString === "")
                return;
            await axios.post(
                `http://localhost:4000/api/upload/post/comment/${user.id}/${post.id}`,
                {
                    commentText: userCommentString
                }
            );
            setUserCommentString("");
            fetchAllCommentsOfGivenPostId();
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (!post)
            return;
        fetchAllCommentsOfGivenPostId();
    }, [post, fetchAllCommentsOfGivenPostId]);

    useEffect(() => {
        if (!post) return;
        const updatedAt: Date = new Date(post.updatedAt);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const readableDate: string = updatedAt.toLocaleDateString('en-US', options);
        setLocalTimeString(readableDate)
    }, [post]);

    const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!postContainerRef)
            return;
        const current = postContainerRef.current;
        if (!current)
            return;
        current.scrollBy({ behavior: "smooth", left: -400 });
        setCurrentIdx((prev) => (prev - 1));
    }

    const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!postContainerRef)
            return;
        const current = postContainerRef.current;
        if (!current)
            return;
        current.scrollBy({ behavior: "smooth", left: 400 });
        setCurrentIdx((prev) => (prev + 1));
    }

    return (
        <>
            <div className="absolute top-0 left-0 z-50 w-[100dvw] h-[100dvh] bg-[#12121288] px-40 py-5 flex justify-center rounded-xl main_box_post_displayer" onClick={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.classList.contains("main_box_post_displayer")) {
                    setPostDisplayerOn(false);
                };
            }}>
                <div className="flex w-full h-full">
                    <div className="w-[700px] h-full relative">
                        <div ref={postContainerRef} className="w-[700px] h-full flex overflow-x-hidden snap-mandatory snap-x remove_scroll_bar">
                            {
                                post ? post.postUrls.map((posturl) => {
                                    return (
                                        <Image key={posturl.id} src={`http://127.0.0.1:8000/uploads/posts/${posturl.url}/1080_1080.jpg`} width={1080} height={1080} alt="post" className="w-[700px] h-full object-cover snap-center" />
                                    )
                                }) :
                                    <Image src={url} width={1080} height={1080} alt="post" className="w-[700px] h-full object-cover" />
                            }
                        </div>
                        {
                            post && post.postUrlCount > 1 && currentIdx < post.postUrlCount - 1 &&
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <button onClick={scrollRight} className='bg-[#121212aa] p-4 rounded-full'>
                                    <svg
                                        aria-label="Right chevron"
                                        fill="currentColor"
                                        height="16"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="16">
                                        <title>Right chevron</title>
                                        <polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                    </svg>
                                </button>
                            </div>
                        }
                        {
                            post && post.postUrlCount > 1 && currentIdx > 0 &&
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <button onClick={scrollLeft} className='bg-[#121212aa] p-4 rounded-full'>
                                    <svg
                                        aria-label="Left chevron"
                                        fill="currentColor"
                                        height="16"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="16">
                                        <title>Left chevron</title>
                                        <polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="w-2/5 bg-[#090909] border-l-1 h-full flex flex-col">
                        {/*profile box */}
                        <div className="flex justify-between p-3 border-b gap-3">
                            <div className="flex items-center gap-3">
                                <Image src={post ? `http://127.0.0.1:8000/uploads/profile/${post.user.imageUrl}/100_100.jpg` : "/images/sonu_profile.jpeg"} width={40} height={40} alt="post" className="w-[40px] h-[40px] object-cover rounded-full" />
                                <div className="text-[14px] font-medium flex gap-1">
                                    <div className="cursor-pointer text-[#dedede] hover:text-[#dedede77]">{post ? post.user.userName : "userName"}</div>
                                    <div className="cursor-default">•</div>
                                    <button className="text-[#0095f6] font-semibold hover:text-[#dedede]">Follow</button>
                                </div>
                            </div>
                            <button className='text-xl py-2 px-2 hover:text-[#898989] hover:font-bold text-[#dedede]'>
                                <IoEllipsisHorizontal />
                            </button>
                        </div>

                        {/*all comment box  */}
                        <div className="h-full w-full overflow-y-scroll remove_scroll_bar flex flex-col gap-1">
                            {
                                post && <UserCommentBoxBar post={post} />
                            }
                            {
                                allCommentsOfPosts.map((comment) => {
                                    return (
                                        <CommentBoxBar key={comment.id} comment={comment} />
                                    )
                                })
                            }
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
                                <div className='text-[#dedede77] text-xs'>{localTimeString}</div>
                            </div>

                        </div>

                        {/* input comment */}
                        <div className="p-3 border-t w-full flex gap-3 h-fit max-h-[80px] items-center">
                            <GrEmoji size={32} />
                            <textarea onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendCommentOnPost();
                                }
                            }} value={userCommentString} onChange={
                                (e) => {
                                    setUserCommentString(e.target.value);
                                }
                            } placeholder='Add a comment...' rows={2} className='max-h-[80px] resize-none w-full outline-none bg-[#090909] text-[#dedededd]' />
                            <button className='text-[#0095f6] font-semibold hover:text-[#dedede]' onClick={
                                (e) => {
                                    sendCommentOnPost();
                                }
                            }>Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="absolute top-5 right-5 z-50 rounded-full cursor-pointer hover:bg-[#23232355] p-3" onClick={() => { setPostDisplayerOn(false) }}>
                <RxCross2 size={60} />
            </button>
        </>
    )
}

export default PostDisplayer