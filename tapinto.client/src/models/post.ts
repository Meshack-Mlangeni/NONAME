import { Comments } from "./comments";

export interface Post {
    Id: number;
    GroupId: number;
    PostType: number;
    PostContent: string;
    UserEmail: string;
    Upvotes: number;
    TimeStamp: Date;
    Labels: string;
    Comments: Comments[];
}
