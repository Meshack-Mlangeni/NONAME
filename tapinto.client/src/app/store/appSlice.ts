import { createSlice } from "@reduxjs/toolkit";

interface IApp {
    Loading: boolean
}

const initialState: IApp = {
    Loading: false,
};

export const AppSlice = createSlice({
    name: "App",
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.Loading = action.payload;
        }
    }
});

export const { setLoading } = AppSlice.actions;