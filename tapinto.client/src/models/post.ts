import { Answer } from "./answers";
import { Chats } from "./chats";


export interface PostDto {
    id: number;
    groupId: number;
    postType: number;
    postContent: string;
    groupName: string;
    userFullNames: string;
    userEmail: string;
    likes: number;
    timeStamp: string;
    comments: number;
    chats: Chats[];
    answers: Answer[];
    labels: string;
    currentUserLiked: boolean;
    verified: boolean;
}