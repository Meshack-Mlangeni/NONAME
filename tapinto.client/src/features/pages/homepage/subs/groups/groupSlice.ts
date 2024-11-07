/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../../../../models/group";
import { response } from "../../../../../models/response/response";
import { setLoading } from "../../../../../app/store/appSlice";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../../../app/axiosAgent/agent";
import { toast } from "react-toastify";

interface groupType {
    groups: Group[]
}

const initialState: groupType = {
    groups: []
}

export const getAllSchoolUserGroupsAsync = createAsyncThunk<response<Group[]>>(
    "activities/getAllSchoolUserGroupsAsync",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await agent.group.getallschoolgroups<response<Group[]>>();
            thunkAPI.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const createGroupAsync = createAsyncThunk<response<Group>, FieldValues>(
    "activities/createGroupAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.group.create<response<Group>>(data)
                .finally(async () => await thunkAPI.dispatch(getAllSchoolUserGroupsAsync()));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const joinOrExitGroupAsync = createAsyncThunk<response<Group>, { groupId: number, action: string }>(
    "groups/joinOrExitGroupAsync",
    async (data: { groupId: number, action: string }, _thunkApi) => {
        try {
            _thunkApi.dispatch(setLoading(true));
            const response = await agent.group.joinorexitgroup<response<Group>>(data.groupId, data.action);
            _thunkApi.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return _thunkApi.rejectWithValue({ error: error.data })
        }
    }

)

export const groupSlice = createSlice({
    name: "groups",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllSchoolUserGroupsAsync.rejected, () => {
        });
        builder.addCase(getAllSchoolUserGroupsAsync.pending, () => {
        });

        builder.addCase(getAllSchoolUserGroupsAsync.fulfilled, (state, action) => {
            state.groups = [...action.payload.data!];
            toast.success(action.payload.message);
        });
        //Create Group
        builder.addCase(createGroupAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Group>).message);
        });
        builder.addCase(createGroupAsync.pending, () => {
        });
        builder.addCase(createGroupAsync.fulfilled, (_, action) => {
            toast.success(action.payload.message);
        });

        builder.addCase(joinOrExitGroupAsync.rejected, (_, action) => {
            toast.error((action.payload as response<Group>).message);
        });
        builder.addCase(joinOrExitGroupAsync.pending, () => {
        });
        builder.addCase(joinOrExitGroupAsync.fulfilled, (_, action) => {
            toast.success(action.payload.message);
        });

    },
});
