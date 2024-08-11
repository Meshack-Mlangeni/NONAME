export interface Comments {
    id: number;
    commentContent: string;
    postId: number;
    userEmail: string;
    timeStamp: string;
    verified: boolean;
    fullNames: string;
}
