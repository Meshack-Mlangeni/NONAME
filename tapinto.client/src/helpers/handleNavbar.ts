import { useLocation } from "react-router-dom"

export function handleNavBar(path: string){
    const location  = useLocation();
    return location.pathname === path ? "text-danger" : "text-white";
}
export function handleSubNavBar(path: string){
    const location = useLocation();
    return location.pathname === path ? "text-danger" : "text-white";
}