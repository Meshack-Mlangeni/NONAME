/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../app/store/store";

const user = useAppSelector(state => state.account);
export const isAutheticated = () => {
    return user.user !== undefined || null;
};
export const getUserFullNames = () => {
    return user.user?.firstName + " " + user.user?.lastName;
};
// @ts-ignore
export const getUserEmail = () => this.user.user?.email;