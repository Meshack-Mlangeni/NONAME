/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agent } from "../../../../../app/axiosAgent/agent";
import { Label } from "../../../../../models/label";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { Post, PostDto } from "../../../../../models/post";
import { store } from "../../../../../app/store/store";

export const getLabelsAsync = createAsyncThunk<Label>(
    "posts/getLabelsAsync",
    async (_, thunkApi) => {
        try {
            const labels = await agent.posts.labels();
            return labels;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
);

export const createActivityAsync = createAsyncThunk<PostDto, FieldValues>(
    "posts/createActivityAsync",
    async (data, thunkApi) => {
        try {
            data.labels = store.getState().posts.selectedLabels.map(l => l.id).join(",");
            const post = await agent.posts.posts(data);
            return post;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
)

interface postType {
    numberOfPosts: number,
    labels: Label[];
    selectedLabels: Label[];
    allPosts: Post[]
}

const initialState: postType = {
    numberOfPosts: 0,
    labels: [],
    selectedLabels: [],
    allPosts: []
};

export const PostSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        increment(state, action) {
            state.numberOfPosts += action.payload;
        },
        addLabel(state, action) {
            state.selectedLabels = (action.payload);
        },
        removeLabel(state, action) {
            state.selectedLabels = state.selectedLabels.filter(lbl => lbl.name !== action.payload);
        },
        resetLabels(state) {
            state.selectedLabels = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLabelsAsync.fulfilled, (state, action) => {
            // @ts-expect-error
            state.labels = action.payload;
        });
        builder.addCase(getLabelsAsync.rejected, () => {
            toast.error("There was an error fetching data")
        });

        builder.addCase(createActivityAsync.fulfilled, (state, action) => {
            state.allPosts.push(action.payload);
            toast.success("Post successfully sent")
        });
        builder.addCase(createActivityAsync.rejected, () => {
            toast.error("There was an error creating you post, please contact system adminitrator.")
        });
    }
});

export const { increment, addLabel, removeLabel, resetLabels } = PostSlice.actions;