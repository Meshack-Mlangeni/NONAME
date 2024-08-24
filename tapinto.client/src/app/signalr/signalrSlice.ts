import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Chats } from "../../models/chats";
import { agent } from "../axiosAgent/agent";

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
            connection.on("ReceiveChatMessage", (chat) => {
                console.log("Please be a chat obj: ", chat);
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
export const sendMessageAsync = createAsyncThunk<Chats, { chat: Chats, connection: HubConnection }>(
    "signalr/sendMessageAsync",
    async ({ chat, connection }, ThunkApi) => {
        try {
            console.log("conn please: ", connection)
            await connection.invoke("JoinLiveDiscussion", "Mesh", "Hello")
            console.log("sendConnection: ", connection);
            console.log("sendChat: ", chat);
            return chat;
        } catch (error: any) {
            return ThunkApi.rejectWithValue({ error: error.data })
        }
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

