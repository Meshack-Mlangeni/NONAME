import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { FieldValues } from "react-hook-form";
import { agent } from "../../../app/axiosAgent/agent";
import { toast } from "react-toastify";
import { routes } from "../../../app/router/Routes";

interface IAccount{ user: User | null;}
const initialState: IAccount = { user: null, }

export const loginAsync = createAsyncThunk<User, FieldValues>(
    "account/loginAsync",
    async (data, thunkApi) => {
        try{ 
            const user = await agent.account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }catch(error: any){
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers:{
        signOutUser: (state) =>{
            state.user = null;
            localStorage.removeItem("user");
            routes.navigate("account/login");
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
        })
    },
})

// eslint-disable-next-line no-empty-pattern
export const {signOutUser} = accountSlice.actions;