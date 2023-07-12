"use client";
import style from './app.module.css'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {reactionAdd, selectAllPosts} from "@/app/features/posts/postsSlice";
import {formatDistanceToNow, parseISO} from "date-fns";


function PostsList(props) {
    const posts = useSelector(selectAllPosts);
    const list = posts.slice().sort().map(post => <PostItem key={post.id} post={post}/>)
    return (
        <div className={style.postsList}>
            <h1>Posts</h1>
            {list}
        </div>
    );
}

function PostItem({post}) {
    const dispatch = useDispatch();
    const reactionEmoji = {
        thumbsUp: '👍',
        hooray: '🎉',
        heart: '❤️',
        rocket: '🚀',
        eyes: '👀'
    }

    const emojiList = Object.entries(reactionEmoji).map(([name, emoji] )=>
        <button key={name} type={"button"}
                onClick={() => dispatch(reactionAdd({
                    id: post.id,
                    reaction: name
                }))}>
            {emoji}{post.reactions[name] ? post.reactions[name] : 0}
        </button>)
    const author = post.user? post.user : "Unknown Author"
    const time = formatDistanceToNow(parseISO(post.date));
    return <article className={style.postItem}>
        <div className={style.postTitle}>{post.title}</div>
        <div className={style.postInfo}>
            <span>By {author}</span>
            <i>{time}</i>
        </div>
        <div className={style.content}>{post.content}</div>
        <div className={style.emoji}>{emojiList}</div>
        <button className={style.viewPost} type={"button"}>View Post</button>
    </article>
}

export default PostsList;