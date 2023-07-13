import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit'
import {faker} from '@faker-js/faker';

const initialState = {
    posts: [], status: 'idle', error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    // todo 模拟请求发送api
    // const response = await client.get('fakeApi/posts');
    let responses = [];
    let count = 5;
    while (count--) {
        let response = {
            id: nanoid(), user: faker.person.fullName(),
            title: faker.word.words({count: {min: 2, max: 5}}),
            content: faker.word.words({count: {min: 20, max: 100}}),
            date: faker.date.anytime().toISOString(),
            reactions: {
                thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0
            }
        };
        responses.push(response);
    }
    return responses;
})

const postsSlice = createSlice({
    name: 'posts', initialState, reducers: {
        postAdd: {
            // 添加一个文章 调用时传入标题 内容和作者，自动生成id和日期
            reducer(state, action) {
                state.posts.push(action.payload)
            }, prepare: (title, content, username) => {
                return {
                    payload: {
                        id: nanoid(), title, content, user: username, date: new Date().toISOString(), reactions: {
                            thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0
                        }
                    }
                }
            }
        }, postUpdate: {
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
            }, prepare: (id, title, content) => {
                return {
                    payload: {
                        id, title, content, date: new Date().toISOString()
                    }
                }
            }
        }, reactionAdd: (state, action) => {
            const {id, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    }, // extraReducers 字段让 slice 处理在别处定义的 actions，
    // 包括由 createAsyncThunk 或其他slice生成的actions。
    extraReducers(builder) {
        // 接受两个参数 第一个是
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPosts = store => store.post.posts;
export const selectPostById = (store, id) => {
    return store.post.posts.find(post => post.id === id)}
export const getAllPaths = store => {
    let response = [];
    store.post.posts.forEach(post => {
        response.push({id: post.id})
    });
    return response;
}
export const {
    postAdd,
    postUpdate,
    reactionAdd
} = postsSlice.actions;
export default postsSlice.reducer;