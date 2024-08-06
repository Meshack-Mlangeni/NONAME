import { Group } from "./group";

export interface School {
    id: number;
    schoolName: string;
    userEmail: string;
    groups: Group[];
}