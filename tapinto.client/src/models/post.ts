import { Answer } from "./answers";
import { Chats } from "./chats";
import { Comments } from "./comments";


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
    comments: Comments[];
    chats: Chats[];
    answers: Answer[];
    labels: string;
    currentUserLiked: boolean;
}