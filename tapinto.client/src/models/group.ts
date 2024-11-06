import { User } from "./user";

export interface Group {
    groupId: number;
    groupName: string;
    schoolName: string;
    userEmail: string;
    users: User[];
}