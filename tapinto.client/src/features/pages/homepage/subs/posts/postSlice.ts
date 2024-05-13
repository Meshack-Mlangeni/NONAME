import { createSlice } from "@reduxjs/toolkit";

interface postType {
    numberOfPosts: number,
    labels: {
        name: string,
        color: string
    }[]
}

const initialState: postType = {
    numberOfPosts: 0,
    labels: []
}

export const PostSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        increment(state, action) {
            state.numberOfPosts += action.payload;
        },
        addLabel(state, action) {
            state.labels = (action.payload)
        },
        removeLabel (state, action) {
            state.labels = state.labels.filter(lbl => lbl.name !== action.payload)
        }
    }
})

export const { increment, addLabel, removeLabel } = PostSlice.actions;