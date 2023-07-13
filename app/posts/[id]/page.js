'use client';
import React from 'react';
import {useSelector} from "react-redux";
import {getAllPaths, selectPostById} from "@/app/features/posts/postsSlice";
import {notFound} from "next/navigation";
import style from './post.module.css'
import Image from "next/image";
import EmojiBar from "@/Components/EmojiBar";
import Link from "next/link";
import {metadata} from "@/app/page";

export const dynamicParams = false;

export async function generateStaticParams() {
    return useSelector(getAllPaths);
}

function Page({params}) {
    let content;
    const post = useSelector(store => selectPostById(store, params.id))
    if (post === undefined) {
        content = "没有找到该文章";
        metadata.title = "404 notfound"
        notFound();
    } else {
        content = <Post post={post}/>;
        metadata.title = "QL: "+post.title;
    }
    return (
        <div className={style.postBox}>
            {content}
        </div>
    );
}

function Post({post}) {
    return <div>
        <Image className={style.girlImg} src={'/img/girl.jpg'} alt={"girl"} width={108} height={108}/>
        <div className={style.essay}>
            <div className={style.essayTitle}>{post.title}</div>
            <p className={style.essayContent}>{post.content}</p>
            <EmojiBar post={post}/>
            <div className={style.linkBar}>
                <Link className={style.link} href={'/'}>回到文章列表</Link>
                <Link className={style.link} href={`/edit/${post.id}`}>编辑该文章</Link>
            </div>
        </div>
    </div>
}

export default Page;