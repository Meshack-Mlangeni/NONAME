import { Answer } from "./answers";
import { Chats } from "./chats";
import { Comments } from "./comments";


export interface PostDto {
    id: number;
    groupId: number;
    postType: number;
    postContent: string;
    userEmail: string;
    upvotes: number;
    timeStamp: string;
    comments: Comments[];
    chats: Chats[];
    answers: Answer[];
    labels: string;
}