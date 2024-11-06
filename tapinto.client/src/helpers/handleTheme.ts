import { toast } from "react-toastify";
import '../App.css';

//TODO: Report Where?
export default function handleTheme(currentTheme: boolean, interval: number): void {
    try {
        const theme = currentTheme ? "dark" : "light";
        toast.info(`${theme.toLocaleUpperCase()} Theme Applied`);
        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', theme);
        window.setTimeout(function () {
            document.documentElement.classList.remove('theme-transition');
        }, interval);
    } catch (e) {
        toast.error("Could Not Change Theme, Please Report Issue On ----");
    }
}