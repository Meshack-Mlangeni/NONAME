/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";

export function handleNavBar(path: string) {
    const location = useLocation();
    return (location.pathname === path || location.pathname.includes(path)) ? "text-primary-subtle" : "text-white";
}
export function handleSubNavBar(path: string) {
    const location = useLocation();
    return (location.pathname === path || location.pathname.includes(path)) ? "text-primary-subtle" : "text-white";
}