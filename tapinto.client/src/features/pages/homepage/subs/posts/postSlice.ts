/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { agent } from "../../../../../app/axiosAgent/agent";
import { Label } from "../../../../../models/label";

import { FieldValues } from "react-hook-form";
import { PostDto } from "../../../../../models/post";
import { AppRootState, store } from "../../../../../app/store/store";
import { setLoading } from "../../../../../app/store/appSlice";
import { Group } from "../../../../../models/group";


export const getLabelsAsync = createAsyncThunk<Label>(
    "activities/getLabelsAsync",
    async (_, thunkApi) => {
        try {
            const labels = await agent.activity.labels();
            return labels;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
);

export const createActivityAsync = createAsyncThunk<PostDto, FieldValues>(
    "activities/createActivityAsync",
    async (data, thunkApi) => {
        try {
            data.labels = store.getState().activities.selectedLabels.map(l => l.id).join(",");
            const post = await agent.activity.create(data);
            return post;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
)

export const getallActivityAsync = createAsyncThunk(
    "activities/getallActivityAsync",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const posts = await agent.activity.getallactivity();
            thunkAPI.dispatch(setLoading(false));
            return posts;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const getAllSchoolUserGroupsAsync = createAsyncThunk(
    "activities/getAllSchoolUserGroupsAsync",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const allGroups = await agent.activity.getallschoolgroups();
            thunkAPI.dispatch(setLoading(false));
            return allGroups;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

const postAdapter = createEntityAdapter<PostDto>()
interface postType {
    numberOfPosts: number,
    labels: Label[];
    selectedLabels: Label[];
    groups: Group[];
}

export const PostSlice = createSlice({
    name: 'activities',
    initialState: postAdapter.getInitialState<postType>({
        numberOfPosts: 0,
        labels: [],
        selectedLabels: [],
        groups: [],
    }),
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
            
        });

        builder.addCase(createActivityAsync.fulfilled, () => {
            
        });
        builder.addCase(createActivityAsync.rejected, () => {
            
        });
        //Get all posts
        builder.addCase(getallActivityAsync.pending, () => {
            
        });

        builder.addCase(getallActivityAsync.rejected, () => {
            
        });

        builder.addCase(getallActivityAsync.fulfilled, (state, action) => {
            postAdapter.setAll(state, action.payload);
        });
        //Get all groups in the school the user is in
        builder.addCase(getAllSchoolUserGroupsAsync.rejected, () => {
            
        });
        builder.addCase(getAllSchoolUserGroupsAsync.pending, () => {
            
        });

        builder.addCase(getAllSchoolUserGroupsAsync.fulfilled, (state, action) => {
            state.groups = [...action.payload];
            
        });
    }
});

export const { increment, addLabel, removeLabel, resetLabels } = PostSlice.actions;
export const postSelector = postAdapter.getSelectors((state: AppRootState) => state.activities);