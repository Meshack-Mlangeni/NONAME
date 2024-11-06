import { Box } from "@mui/joy";
import { useLocation } from "react-router-dom";

interface ISPACE {
    spacing?: { pt: number; pb: number; };
}

export default function NavSpacingComponent({ spacing }: ISPACE) {
    const location = useLocation();
    return (
        <>
            {location.pathname.includes("home") ? (
                <Box sx={spacing ? spacing : { pt: 5, pb: 2 }}></Box>
            ) : (
                <Box sx={spacing ? spacing : { pt: 2, pb: 2 }}></Box>
            )}
        </>
    );
}