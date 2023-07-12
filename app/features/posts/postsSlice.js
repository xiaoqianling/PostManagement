import {createSlice, nanoid} from '@reduxjs/toolkit'
import {reducer} from "next/dist/client/components/router-reducer/router-reducer";


const initialState = {
    posts: [{
        id: 1, title: "how to get a girlfriend", content: "such a difficult problem...maybe complexer than code...",
        user: "qianling", date: new Date().toISOString(), reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    }],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdd: {
            // 添加一个文章 调用时传入标题 内容和作者，自动生成id和日期
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare: (title, content, username) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: username,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        postUpdate: {
            reducer(state, action) {
                const {id, title, content, date} = action.payload;
                const post = state.posts.find(post => post.id === id)
                if (post) {
                    if (post.title === title && post.content === content) {
                        return;
                    }
                    post.title = title;
                    post.content = content;
                    post.date = date;
                }
            },
            prepare: (id, title, content) => {
                return {
                    payload: {
                        id, title, content, date: new Date().toISOString()
                    }
                }
            }
        },
        reactionAdd: (state, action) => {
            const {id, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    }
})

export const selectAllPosts = store => store.post.posts;
export const selectPostById = (store, id) => store.post.posts.find(post => post.id === id)
export const {
    postAdded,
    postUpdate,
    reactionAdd
} = postsSlice.actions;
export default postsSlice.reducer;