import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PostSlice } from "../../features/pages/homepage/subs/posts/postSlice";
import { accountSlice } from "../../features/pages/account/accountSlice";
import { AppSlice } from "./appSlice";

export const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
        activities: PostSlice.reducer,
        account: accountSlice.reducer
    }
});

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector