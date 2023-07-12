import {configureStore} from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
export const store = configureStore({
    reducer:{
        post: postsReducer,
        user:usersReducer
    }
})