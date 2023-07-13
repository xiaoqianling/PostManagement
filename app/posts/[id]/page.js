"use client";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPaths, selectPostById} from "@/app/features/posts/postsSlice";

export const dynamicParams = false;
export async function generateStaticParams() {
    const paths = useSelector(getAllPaths)
    console.log("paths:",paths)
    return paths;
}

function Page({params}) {
    console.log(params)
    const post = useSelector(store => selectPostById(store, params.id))

    return (
        <div>
            <h2>{post.title}</h2>
        </div>
    );
}

export default Page;