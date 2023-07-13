import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {postUpdate} from "@/app/features/posts/postsSlice";
import {useRouter} from "next/router";

function EditPost({post}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const router = useRouter();

    const handleUpdate = () => {
        dispatch(postUpdate(post.id, title, content));
        router.push(`/posts/${post.id}`);
    }

    return (
        <div>
            <form>
                <label htmlFor="title">标题:</label>
                <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="context">内容:</label>
                <textarea value={content} onChange={e => setContent(e.target.value)}/>
                <button onClick={handleUpdate}>保存修改</button>
            </form>
        </div>
    );
}

export default EditPost;