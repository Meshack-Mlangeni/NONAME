import { Box } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    const Mobile = useMediaQuery("(min-width:1100px)");
    return (
        <Box {...(Mobile) ? { sx: { ml: 16, mr: 16 } } : { sx: { ml: 2, mr: 2 } }}>
            <Outlet />
        </Box>
    );
}