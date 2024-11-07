/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../app/axiosAgent/agent";
import { routes } from "../../../app/router/Routes";
import { response } from "../../../models/response/response";

interface IAccount { user: User | null; }
const initialState: IAccount = { user: null, };

export interface manageCache<T> { work: "add" | "remove" | "both" | "get", key: string, data: T | null; }
const ManageUserLocalCache = <T>({ work, key, data }: manageCache<T>) => {
    if (work === "add")
        localStorage.setItem(key, JSON.stringify(data));
    else if (work === "remove")
        localStorage.getItem(key) && localStorage.removeItem("user");
    else if (work === "get")
        return localStorage.getItem(key);
    else {
        localStorage.getItem(key) && localStorage.removeItem("user")
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export const loginAsync = createAsyncThunk<response<User>, FieldValues>(
    "account/loginAsync",
    async (data, thunkApi) => {
        try {
            const response = await agent.account.login<response<User>>(data);
            ManageUserLocalCache<response<User>>({ work: "both", key: "user", data: response.data });
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);
export const registerAsync = createAsyncThunk<response<User>, FieldValues>(
    "account/registerAsync",
    async (data, thunkApi) => {
        try {
            const response = await agent.account.register<response<User>>(data);
            ManageUserLocalCache<response<User>>({ work: "both", key: "user", data: response.data });
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchLoggedInUser = createAsyncThunk<response<User>>(
    "account/fetchLoggedInUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(ManageUserLocalCache<response<User>>({ work: "get", key: "user", data: null })!)));
        try {
            const response = await agent.account.currentUser<response<User>>();
            ManageUserLocalCache<response<User>>({ work: "add", key: "user", data: response.data });
            return response;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        signUserOutAsync: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            routes.navigate("/login");
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload.data!;
            routes.navigate("/home/activity");
        });
        builder.addCase(loginAsync.rejected, () => {
        });
        builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            state.user = action.payload.data!;
            routes.navigate("/home/activity");
        });
        builder.addCase(fetchLoggedInUser.rejected, (state) => {
            state.user = null;
            ManageUserLocalCache<response<User>>({ work: "remove", key: "user", data: null });
            routes.navigate("/home/activity");
        });

        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.user = action.payload.data!;
            routes.navigate("/home/activity");
        });
        builder.addCase(registerAsync.rejected, (state) => {
            state.user = null;
            ManageUserLocalCache<response<User>>({ work: "remove", key: "user", data: null });
            routes.navigate("/home/activity");
        });

    },
});
export const { setUser, signUserOutAsync } = accountSlice.actions;