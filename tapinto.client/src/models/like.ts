import { Activity } from "./activity";

export interface Like {
    likeId: number;
    userEmail: string;
    activityId: number;
    activity: Activity;
}