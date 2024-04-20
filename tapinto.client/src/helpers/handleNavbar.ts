import { useLocation } from "react-router-dom"

export default function handleNavBar(path: string){
    const location = useLocation();
    return location.pathname === path ? "text-danger" : "text-white";
}