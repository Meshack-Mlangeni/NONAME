import { Box } from "@mui/joy";
import { useLocation } from "react-router-dom";

export default function NavSpacingComponent() {
  const location = useLocation();
  return <>{ location.pathname.includes("home") ? <Box sx={{ pt: 5, pb: 2 }}></Box> : <Box sx={{ pt: 2, pb: 2 }}></Box>}</>;
}
