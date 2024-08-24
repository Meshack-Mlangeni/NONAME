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
import { Comments } from "../../../../../models/comments";


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

export const likeActivityAsync = createAsyncThunk(
    "activity/likeActivityAsync",
    async (id: number, thunkAPI) => {
        try {
            await agent.activity.like_activity(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

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

export const getallActivityAsync = createAsyncThunk<[], number>(
    "activities/getallActivityAsync",
    async (skip, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const posts = await agent.activity.getallactivity(skip);
            thunkAPI.dispatch(setLoading(false));
            return posts;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const getSingleActivityAsync = createAsyncThunk(
    "activity/getSingleActivityAsync",
    async (id: number, ThunkApi) => {
        try {
            const singleActivity = agent.activity.getsingleactivity(id);
            return singleActivity;
        } catch (error: any) {
            return ThunkApi.rejectWithValue({error: error.data});
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
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const createGroupAsync = createAsyncThunk<Group, FieldValues>(
    "activities/createGroupAsync",
    async (data, thunkAPI) => {
        try {
            const group = await agent.activity.createGroup(data)
                .finally(async () => await thunkAPI.dispatch(getAllSchoolUserGroupsAsync()));
            return group;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const commentOnActivityAsync = createAsyncThunk<Comments, FieldValues>(
    "activity/commentOnActivityAsync",
    async (data, ThunkAPI) => {
        try {
            const comment = await agent.activity.comment(data);
            return comment;
        } catch (error: any) {
            return ThunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const getAllActivityComments = createAsyncThunk(
    "activity/getAllActivityComments",
    async (id: number, ThunkAPI) => {
        try {
            return await agent.activity.getallactivitycomments(id);
        } catch (error: any) {
            return ThunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

const postAdapter = createEntityAdapter<PostDto>(
    { sortComparer: (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime(), }
)
interface postType {
    numberOfPosts: number,
    labels: Label[];
    single_activity : PostDto | null;
    selectedLabels: Label[];
    groups: Group[];
    post_comments: Comments[];
}

export const PostSlice = createSlice({
    name: 'activities',
    initialState: postAdapter.getInitialState<postType>({
        numberOfPosts: 0,
        labels: [],
        single_activity: null,
        selectedLabels: [],
        groups: [],
        post_comments: [],
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
        },
        resetComments(state) {
            state.post_comments = [];
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
            postAdapter.setMany(state, action.payload);
        });
        //Get all groups in the school the user is in
        builder.addCase(getAllSchoolUserGroupsAsync.rejected, () => {

        });
        builder.addCase(getAllSchoolUserGroupsAsync.pending, () => {

        });

        builder.addCase(getAllSchoolUserGroupsAsync.fulfilled, (state, action) => {
            state.groups = [...action.payload];
        });
        //Create Group
        builder.addCase(createGroupAsync.rejected, () => {
            //toast.error(action.error);
        });
        builder.addCase(createGroupAsync.pending, () => {

        });
        builder.addCase(createGroupAsync.fulfilled, () => {

        });
        //getallcomments
        builder.addCase(getAllActivityComments.rejected, () => {
            //toast.error(action.error);
        });
        builder.addCase(getAllActivityComments.pending, () => {

        });
        builder.addCase(getAllActivityComments.fulfilled, (state, action) => {
            state.post_comments = [...action.payload];
        });

        builder.addCase(getSingleActivityAsync.rejected, () => {
            //toast.error(action.error);
        });
        builder.addCase(getSingleActivityAsync.pending, () => {

        });
        builder.addCase(getSingleActivityAsync.fulfilled, (state, action) => {
            state.single_activity = action.payload;
        });
    }
});

export const { increment, addLabel, removeLabel, resetLabels, resetComments } = PostSlice.actions;
export const postSelector = postAdapter.getSelectors((state: AppRootState) => state.activities);