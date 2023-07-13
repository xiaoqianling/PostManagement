'use client';
import {reactionAdd} from "@/app/features/posts/postsSlice";
import style from "./EmojiBar.module.css";
import React from "react";
import {useDispatch} from "react-redux";

export default function EmojiBar({post}) {
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

    return <div className={style.emoji}>{emojiList}</div>
}