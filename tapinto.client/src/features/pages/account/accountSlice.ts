/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../app/axiosAgent/agent";
import { routes } from "../../../app/router/Routes";
import { response } from "../../../models/response/response";

interface IAccount { user: User | null; }
const initialState: IAccount = { user: null, };

export interface manageCache<T> { work: "add" | "remove" | "both" | "get" | "clear", key: string, data: T | null; }
const ManageUserLocalCache = <T>({ work, key, data }: manageCache<T>) => {
    if (work === "add")
        localStorage.setItem(key, JSON.stringify(data));
    else if (work === "remove")
        localStorage.getItem(key) && localStorage.removeItem(key);
    else if (work === "get")
        return localStorage.getItem(key);
    else if (work === "clear")
        localStorage.clear();
    else {
        if (localStorage.getItem(key))
            localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(data));
    }
}
interface IRoles {
    action: any
}
const extractRoles = ({ action }: IRoles) => {
    const claims = JSON.parse(atob(action.payload.data!.token.split(".")[1].toString()));
    const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return typeof (roles) === "string" ? [roles] : roles;
};

export const loginAsync = createAsyncThunk<response<User>, FieldValues>(
    "account/loginAsync",
    async (data, thunkApi) => {
        try {
            return await agent.account.login<response<User>>(data);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);
export const registerAsync = createAsyncThunk<response<User>, FieldValues>(
    "account/registerAsync",
    async (data, thunkApi) => {
        try {
            return await agent.account.register<response<User>>(data);
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
            return await agent.account.currentUser<response<User>>();
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
            ManageUserLocalCache({ work: "clear", key: "none", data: null });
            routes.navigate("/login");
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchLoggedInUser.rejected, (state) => {
            state.user = null;
            ManageUserLocalCache<response<User>>({ work: "remove", key: "user", data: null });
            routes.navigate("/home/activity");
        });
        builder.addMatcher(isAnyOf(registerAsync.rejected, loginAsync.rejected), (state) => {
            state.user = null;
            ManageUserLocalCache<response<User>>({ work: "clear", key: "none", data: null });
            routes.navigate("/login");
        });
        builder.addMatcher(isAnyOf(loginAsync.fulfilled, registerAsync.fulfilled, fetchLoggedInUser.fulfilled), (state, action) => {
            state.user = { ...action.payload.data!, roles: extractRoles({ action }) };
            ManageUserLocalCache({ work: "add", key: "user", data: state.user });
            routes.navigate("/home/activity");
        })
    },
});
export const { setUser, signUserOutAsync } = accountSlice.actions;