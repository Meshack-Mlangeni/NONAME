import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface signalrType {
    connection: HubConnection | null;
}

const initialState: signalrType = {
    connection: null,
}

export const createConnectionAsync = createAsyncThunk<HubConnection, { userEmail: string, discussionId: number }>(
    "signalr/createConnectionAsync",
    async ({ userEmail, discussionId }, ThunkApi) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5169/livehub")
                .configureLogging(LogLevel.Information)
                .build();
            connection.on("ReceiveMessage", (userEmail, msg) => {
                console.log("msg", msg);
            })
            await connection.start().then(() => console.info("connection successfully established..."));
            await connection.invoke("JoinLiveDiscussion", userEmail, discussionId)
            return connection;
        } catch (error: any) {
            console.log(error);
            return ThunkApi.rejectWithValue({ error: error.data });
        }
    }
)
export const sendMessageAsync = createAsyncThunk(
    "signalr/sendMessageAsync",
    async ({ message, discussionId, userEmail }, ThunkApi) => {

    }
)

export const signalrSlice = createSlice({
    name: "signalr",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createConnectionAsync.fulfilled, (state, action) => {
            toast.success("Connected!");
            state.connection = action.payload;
        })
    },
})

