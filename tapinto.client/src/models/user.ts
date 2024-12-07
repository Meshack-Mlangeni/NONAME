import { Group } from "./group";

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    bio: string;
    school: string;
    verified: boolean;
    groups: Group[];
    numberOfActivities: number;
    roles: string[]
}