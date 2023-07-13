'use client';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPostById} from "@/app/features/posts/postsSlice";
import {notFound} from "next/navigation";
import EditPost from "@/app/edit/[id]/EditPost";

function Page({params}) {
    const dispatch = useDispatch();
    const post = useSelector(store => selectPostById(store, params.id))
    if (!post) {
        notFound();
    }
    return (
        <>
            <EditPost post={post}/>
        </>
    );
}

export default Page;