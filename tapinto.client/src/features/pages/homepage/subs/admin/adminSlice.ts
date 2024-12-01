/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../../../app/axiosAgent/agent";
import { response } from "../../../../../models/response/response";
import { School } from "../../../../../models/school";
import { toast } from "react-toastify";
import { setLoading } from "../../../../../app/store/appSlice";

interface IInitialState {
    AddedSchools: School[] | null;
}

const initialState: IInitialState = {
    AddedSchools: null
}

export const uploadExcelSchoolSheetAsync = createAsyncThunk(
    "admin/uploadExcelSchoolSheetAsync",
    async (data: FieldValues, ThunkAPI) => {
        try {
            ThunkAPI.dispatch(setLoading(true));
            const response: response<School[]> = await agent.admin.uploadexcel<response<School[]>>(data);
            ThunkAPI.dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return ThunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(uploadExcelSchoolSheetAsync.fulfilled, (state, action) => {
            toast.success("Successfully Uploaded Excel School Sheet");
            state.AddedSchools = [...action.payload.data!]
            console.table(state.AddedSchools)
        });
        builder.addCase(uploadExcelSchoolSheetAsync.rejected, (_, action) => {
            toast.error((action.payload as response<School[]>).message)
        })
    },
})
