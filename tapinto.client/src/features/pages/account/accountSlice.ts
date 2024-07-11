/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../app/axiosAgent/agent";
import { toast } from "react-toastify";
import { routes } from "../../../app/router/Routes";

interface IAccount { user: User | null; }
const initialState: IAccount = { user: null, }

export const loginAsync = createAsyncThunk<User, FieldValues>(
    "account/loginAsync",
    async (data, thunkApi) => {
        try {
            const user = await agent.account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchLoggedInUser = createAsyncThunk<User>(
    "account/fetchLoggedInUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
        try {
            const user = await agent.account.currentUser()
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        signOutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            routes.navigate("/login");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            toast.success("Welcome");
            routes.navigate("/home")
        });
        builder.addCase(loginAsync.rejected, () => {
            toast.error("Error logging in, contact admin!!");
        });
        builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            state.user = action.payload;
            routes.navigate("/home")
        });
        builder.addCase(fetchLoggedInUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            routes.navigate("/home")
            toast.error("Your session has expired, click toast to login", { delay: 5000, onClick: () => routes.navigate("/login") });
        });
    },
})
export const { signOutUser, setUser } = accountSlice.actions;