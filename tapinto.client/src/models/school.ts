import { Group } from "./group";

export interface School {
    schoolId: number;
    schoolName: string;
    userEmail: string;
    groups: Group[];
}