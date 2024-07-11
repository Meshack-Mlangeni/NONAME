import { Group } from "./group";

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    bio: string;
    school: string;
    groups: Group[];
}