import { Group } from "./group";

export interface User{
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Groups: Group[];
}
