import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PostSlice } from "../../features/pages/homepage/subs/posts/postSlice";
import { accountSlice } from "../../features/pages/account/accountSlice";
import { AppSlice } from "./appSlice";
import { schoolSlice } from "../../features/pages/homepage/subs/myschool/schoolSlice";
import { signalrSlice } from "../signalr/signalrSlice";

export const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
        activities: PostSlice.reducer,
        account: accountSlice.reducer,
        school: schoolSlice.reducer,
        signalR: signalrSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector