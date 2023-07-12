import React from 'react';
import style from './app.module.css'

function AddPostForm(props) {
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
                />
                <label htmlFor="postAuthor">作者：</label>
                <select id={'postAuthor'} className={style.select}>
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
                />
                <button className={style.button} type="button" disabled={false}>保存文章</button>
            </form>
        </section>
    );
}

export default AddPostForm;