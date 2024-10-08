/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { School } from "../../../../../models/school";
import { agent } from "../../../../../app/axiosAgent/agent";

export const getAllSchoolsAsync = createAsyncThunk<School>(
    "school/getAllSchoolsAsync",
    async (_, thunkAPI) => {
        try {
            const schools = agent.school.getallschools();
            return schools;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

interface schoolSliceType {
    schools: School[]
}

const initialState: schoolSliceType = {
    schools: []
}

export const schoolSlice = createSlice({
    name: "school",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getAllSchoolsAsync.fulfilled, (state, action) => {
            state.schools = [...action.payload];
        }),
            builder.addCase(getAllSchoolsAsync.rejected, () => {
                console.log("error occured!")
            })
    }
})

