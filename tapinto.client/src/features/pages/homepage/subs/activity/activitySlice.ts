/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agent } from "../../../../../app/axiosAgent/agent";
import { FieldValues } from "react-hook-form";
import { Activity } from "../../../../../models/activity";
import { setLoading } from "../../../../../app/store/appSlice";
import { Comments } from "../../../../../models/comments";
import { response } from "../../../../../models/response/response";
import { toast } from "react-toastify";
import { Like } from "../../../../../models/like";

export const likeActivityAsync = createAsyncThunk<response<Like>, number>(
    "activity/likeActivityAsync",
    async (id: number, thunkAPI) => {
        try {
            return await agent.activity.like_activity<response<Activity>>(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const createActivityAsync = createAsyncThunk<response<Activity>, FieldValues>(
    "activities/createActivityAsync",
    async (data, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await agent.activity.create<response<Activity>>(data);
            thunkApi.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

export const getallActivityAsync = createAsyncThunk<response<Activity[]>, number>(
    "activities/getallActivityAsync",
    async (skip, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await agent.activity.getallactivity<response<Activity[]>>(skip);
            thunkAPI.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const getSingleActivityAsync = createAsyncThunk<response<Activity>, number>(
    "activities/getSingleActivityAsync",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await agent.activity.getactivity<response<Activity>>(id);
            thunkAPI.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const commentOnActivityAsync = createAsyncThunk<response<Comments[]>, FieldValues>(
    "activity/commentOnActivityAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.activity.comment<response<Comments[]>>(data);
            await setInterval(() => { }, 3000);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const getAllActivityCommentsAsync = createAsyncThunk<response<Comments[]>, number>(
    "activity/getAllActivityCommentsAsync",
    async (id: number, ThunkAPI) => {
        try {
            return await agent.activity.getallactivitycomments<response<Comments[]>>(id);
        } catch (error: any) {
            return ThunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

interface ActivityType {
    numberOfActivity: number,
    activityComments: Comments[],
    activities: Activity[],
    single_activity: Activity | null,
}
const initialState: ActivityType = {
    numberOfActivity: 0,
    activityComments: [],
    activities: [],
    single_activity: null
}

export const ActivitySlice = createSlice({
    name: 'activities',
    initialState: initialState,
    reducers: {
        increment(state, action) {
            state.numberOfActivity += action.payload;
        },
        resetComments(state) {
            state.activityComments = [];
        },
        resetActivities(state) {
            state.activities = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createActivityAsync.fulfilled, (state, action) => {
            const data = [action.payload.data as Activity, ...state.activities];
            state.activities = [...new Set(data.map(a => a))];
            toast.success(action.payload.message);
        });
        builder.addCase(createActivityAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Activity>).message);
        });
        //Get all posts
        builder.addCase(getallActivityAsync.pending, () => {
        });

        builder.addCase(getallActivityAsync.rejected, () => {
        });

        builder.addCase(getallActivityAsync.fulfilled, (state, action) => {
            //activityAdapter.upsertMany(state, action.payload.data!);
            const data = [...state.activities, ...action.payload.data as Activity[]];
            state.activities = [...new Set(data.map(a => a))];
            state.activities.sort((a, b) => {
                return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
            })
            toast.success(action.payload.message);
        });


        builder.addCase(commentOnActivityAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Comment>).message);
        });
        builder.addCase(commentOnActivityAsync.pending, () => {
        });
        builder.addCase(commentOnActivityAsync.fulfilled, (state, action) => {
            state.activityComments = [...new Set([...action.payload.data as Comments[]])]
            toast.success(action.payload.message);
        });


        builder.addCase(getAllActivityCommentsAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Activity>).message);
        });
        builder.addCase(getAllActivityCommentsAsync.pending, () => {
        });
        builder.addCase(getAllActivityCommentsAsync.fulfilled, (state, action) => {
            state.activityComments = [...new Set([...action.payload.data as Comments[]])]
            toast.success(action.payload.message);
        });

        builder.addCase(getSingleActivityAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Activity>).message);
        });
        builder.addCase(getSingleActivityAsync.pending, () => {
        });
        builder.addCase(getSingleActivityAsync.fulfilled, (state, action) => {
            state.single_activity = action.payload.data as Activity;
        });

    }
});

export const { increment, resetComments, resetActivities } = ActivitySlice.actions;