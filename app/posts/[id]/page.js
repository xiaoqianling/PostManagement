'use client';
import React from 'react';
import {useSelector} from "react-redux";
import {getAllPaths, selectPostById} from "@/app/features/posts/postsSlice";
import {notFound} from "next/navigation";
import style from './post.module.css'
import Image from "next/image";
import EmojiBar from "@/app/components/EmojiBar";
import Link from "next/link";
import {metadata} from "@/app/page";

export const dynamicParams = false;

export async function generateStaticParams() {
    return GetPaths();
}

/**
 * 为什么要搞个函数来返回useSelector？
 * React的hook只能在组件内部(函数式组件首字母要大写)或自定义组件(函数以use开头)内部使用
 * 直接在上面的函数使用显然不符合其中一种条件，无法生成
 * 而generateStaticParams是next指定的静态生成页面路径 函数名不能变
 * 在矛盾下采用了这种方式：用一个首字母大写的函数调用useSelector。
 */
function GetPaths() {
    return useSelector(getAllPaths)
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