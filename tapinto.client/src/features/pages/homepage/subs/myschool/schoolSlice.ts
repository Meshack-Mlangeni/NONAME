/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { School } from "../../../../../models/school";
import { agent } from "../../../../../app/axiosAgent/agent";
import { response } from "../../../../../models/response/response";
import { setLoading } from "../../../../../app/store/appSlice";

export const getAllSchoolsAsync = createAsyncThunk<response<School[]>>(
    "school/getAllSchoolsAsync",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = agent.school.getallschools<response<School[]>>();
            thunkAPI.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

interface schoolSliceType {
    schools: School[];
}

const initialState: schoolSliceType = {
    schools: []
};

export const schoolSlice = createSlice({
    name: "school",
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getAllSchoolsAsync.fulfilled, (state, action) => {
            // @ts-ignore
            state.schools = [...action.payload.data];
        }),
            builder.addCase(getAllSchoolsAsync.rejected, () => {
                console.log("error occured!");
            });
    }
});