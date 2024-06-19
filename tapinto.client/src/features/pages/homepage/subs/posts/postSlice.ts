import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agent } from "../../../../../app/axiosAgent/agent";
import { Label } from "../../../../../models/label";
import { toast } from "react-toastify";

export const getLabelsAsync = createAsyncThunk<Label>(
    "posts/getLabelsAsync",
    async (_, thunkApi) => {
        try {
            const labels = await agent.posts.labels();
            console.log("Labels in thunk: ", labels);
            return labels;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error })
        }
    }
);

interface postType {
    numberOfPosts: number,
    labels: Label[];
    selectedLabels: Label[];
}

const initialState: postType = {
    numberOfPosts: 0,
    labels: [],
    selectedLabels: []
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLabelsAsync.fulfilled, (state, action) => {
            state.labels = action.payload;
            console.log("Labels in builder: ", state.labels)
        });
        builder.addCase(getLabelsAsync.rejected, () => {
            toast.error("There was an error fetching data")
        });
    }
});

export const { increment, addLabel, removeLabel } = PostSlice.actions;