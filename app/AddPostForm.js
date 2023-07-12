"use client";
import React, {useState} from 'react';
import style from './app.module.css'
import {useDispatch} from "react-redux";
import {postAdd} from "@/app/features/posts/postsSlice";

function AddPostForm(props) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    let disabled = title!=="" && author!=="" && content!=="";

    const dispatch = useDispatch();

    const handleSavePost = () => {
        dispatch(postAdd(title, content, author));
        setTitle("");
        setAuthor("");
        setContent("");
    }

    return (
        <section>
            <h2>添加新文章</h2>
            <form className={style.form}>
                <label htmlFor="postTitle">文章标题:</label>
                <input
                    className={style.input}
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <label htmlFor="postAuthor">作者：</label>
                <select id={'postAuthor'} className={style.select} value={author}
                        onChange={e => {setAuthor(e.target.value)}}>
                    <option value=""></option>
                    <option value="qianling">Qianling</option>
                    <option value="shiyin">Shiyin</option>
                    <option value="xinci">Xinci</option>
                </select>
                <label htmlFor="postContent">内容：</label>
                <textarea
                    className={style.textarea}
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={e => {setContent(e.target.value)}}
                />
                <button className={style.saveButton} type="button" disabled={!disabled} onClick={handleSavePost}>保存文章</button>
            </form>
        </section>
    );
}

export default AddPostForm;