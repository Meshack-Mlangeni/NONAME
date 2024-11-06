import "../../App.css";
import MobileNavBar from "./MobileNavBar";
import { useMediaQuery } from "@mui/material";
import TabDesktopNavBar from "./TabDesktopNavBar";
import NavSpacingComponent from "./NavSpacingComponent";

export default function NavigationBar() {
    const Tablet_Desktops = useMediaQuery("(min-width:700px)");

    return (
        <>
            {Tablet_Desktops ? (
                <TabDesktopNavBar />
            ) : (
                <>
                    <MobileNavBar />
                </>
            )}
            <NavSpacingComponent />
        </>
    );
}