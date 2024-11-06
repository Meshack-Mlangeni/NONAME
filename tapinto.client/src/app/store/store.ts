import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActivitySlice } from "../../features/pages/homepage/subs/activity/activitySlice";
import { accountSlice } from "../../features/pages/account/accountSlice";
import { AppSlice } from "./appSlice";
import { schoolSlice } from "../../features/pages/homepage/subs/myschool/schoolSlice";

export const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
        activities: ActivitySlice.reducer,
        account: accountSlice.reducer,
        school: schoolSlice.reducer,
    }
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;