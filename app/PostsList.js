"use client";
import style from './app.module.css'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectAllPosts} from "@/app/features/posts/postsSlice";
import {formatDistanceToNow, parseISO} from "date-fns";
import Link from "next/link";
import EmojiBar from "@/app/components/EmojiBar";


function PostsList() {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    const status = useSelector(state => state.post.status);
    const error = useSelector(state => state.post.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    let list;
    if (status === "loading"||status === 'idle') {
        list = <div>还在加载，别急</div>
    } else if (status === "succeeded") {
        list = posts.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(post => <PostItem key={post.id} post={post}/>);
    } else {
        list = <div>Error:{error} {status}</div>
    }

    return (
        <div className={style.postsList}>
            <h1>Posts</h1>
            {list}
        </div>
    );
}

function PostItem({post}) {
    const author = post.user? post.user : "Unknown Author"
    const time = formatDistanceToNow(parseISO(post.date));
    return <article className={style.postItem}>
        <div className={style.postTitle}>{post.title}</div>
        <div className={style.postInfo}>
            <span>By {author}</span>
            <i>{time}</i>
        </div>
        <div className={style.content}>{post.content}</div>
        <EmojiBar post={post}/>
        <Link href={`posts/${post.id}`} className={style.viewPost} type={"button"}>View Post</Link>
    </article>
}

export default PostsList;