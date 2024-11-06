import { Answer } from "./answers";
import { Chats } from "./chats";

export interface Activity {
    imageUrl: string;
    id: number;
    groupId: number;
    activityType: number;
    activityContent: string;
    groupName: string;
    userFullNames: string;
    userEmail: string;
    likes: number;
    timeStamp: string;
    comments: number;
    chats: Chats[];
    answers: Answer[];
    currentUserLiked: boolean;
    verified: boolean;
    file?: Blob;
}