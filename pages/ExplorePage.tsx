"use client";
import PostsGridLayout from '@/components/custom/explore/PostsGridLayout'
import React, { useEffect, useRef, useState } from 'react'

const ExplorePage = () => {
    const isLeftLayout = true;
    const gridParentRef = useRef<HTMLDivElement | null>(null);
    const [groupedImages, setGroupedImages] = useState<string[][]>([
        ["/images/high/2.jpg", "/images/high/5.jpg", "/images/high/11.jpg", "/images/high/13.jpg", "/images/high/2.jpg"],
        ["/images/high/1.jpg", "/images/high/4.jpg", "/images/high/4.jpg", "/images/high/5.jpg", "/images/high/12.jpg"],
        ["/images/high/5.jpg", "/images/high/13.jpg", "/images/high/10.jpg", "/images/high/4.jpg", "/images/high/7.jpg"]
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchImages = async () => {
        try {
            setLoading(true);
            setGroupedImages((prevImages) => {
                if (prevImages.length > 0 && prevImages[prevImages.length - 1].length < 5) {
                    const imageGroup = prevImages;
                    imageGroup[imageGroup.length - 1].push(`/images/high/${Math.floor(Math.random() * (14)) + 1}.jpg`);
                    return imageGroup
                };
                return [...prevImages, [`/images/high/${Math.floor(Math.random() * (14)) + 1}.jpg`]];
            });
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleScroll = () => {
        if (gridParentRef.current) {
            const { scrollTop, scrollHeight } = gridParentRef.current;
            const { innerHeight } = window;
            if (scrollHeight - innerHeight - 10 < scrollTop) {
                fetchImages();
                fetchImages();
                fetchImages();
                fetchImages();
                fetchImages();
            }
        }
    };


    return (
        <div className="px-40 pt-5 flex flex-col gap-1 overflow-y-scroll" onScroll={handleScroll} ref={gridParentRef}>
            {
                groupedImages.length > 0 && groupedImages.map((imageGroup, index) => {
                    if (imageGroup.length === 5) {

                        return <PostsGridLayout
                            key={index}
                            isLeftLayout={index % 2 === 0 ? isLeftLayout : !isLeftLayout}
                            url1={imageGroup[0]}
                            url2={imageGroup[1]}
                            url3={imageGroup[2]}
                            url4={imageGroup[3]}
                            url5={imageGroup[4]}
                        />
                    } else {
                        return <></>
                    }
                }
                )
            }
            {/* <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/1.jpg"} url2={"/images/posts/2.jpg"} url3={"/images/posts/3.jpg"} url4={"/images/posts/4.jpg"} url5={"/images/posts/5.jpg"} />
            <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/6.jpg"} url2={"/images/posts/7.jpg"} url3={"/images/posts/8.jpg"} url4={"/images/posts/9.jpg"} url5={"/images/posts/10.jpg"} />
            <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/11.jpg"} url2={"/images/posts/12.jpg"} url3={"/images/posts/13.jpg"} url4={"/images/posts/14.jpg"} url5={"/images/posts/15.jpg"} />
            <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/16.jpg"} url2={"/images/posts/17.jpg"} url3={"/images/posts/18.jpg"} url4={"/images/posts/19.jpg"} url5={"/images/posts/20.jpg"} />
            <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/21.jpg"} url2={"/images/posts/22.jpg"} url3={"/images/posts/23.jpg"} url4={"/images/posts/24.jpg"} url5={"/images/posts/25.jpg"} />
            <PostsGridLayout isLeftLayout={isLeftLayout} setIsLeftLayout={setIsLeftLayout} url1={"/images/posts/26.jpg"} url2={"/images/posts/27.jpg"} url3={"/images/posts/28.jpg"} url4={"/images/posts/29.jpg"} url5={"/images/posts/30.jpg"} /> */}
        </div>
    )
}

export default ExplorePage