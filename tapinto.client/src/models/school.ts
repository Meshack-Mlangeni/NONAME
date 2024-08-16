import { Group } from "./group";
import { User } from "./user";

export interface School {
    id: number;
    schoolName: string;
    userEmail: string;
    groups: Group[];
    users: User[];
}