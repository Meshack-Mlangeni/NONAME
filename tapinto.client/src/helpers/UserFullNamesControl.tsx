import { Verified } from "@mui/icons-material";
import { Typography, TypographySystem } from "@mui/joy";
import { SxProps } from "@mui/material";

interface UFNC {
    fullnames: string;
    size?: string;
    achivements?: [];
    verified?: boolean;
    sx?: SxProps;
    level?: keyof TypographySystem | "inherit" | undefined;
}

function UserFullNamesControl({ fullnames, verified = false, sx, level }: UFNC) {
    return (
        <div>
            <Typography sx={sx} level={level}>
                {fullnames}
                {verified && (
                    <Verified
                        sx={{ mt: -0.3, ml: 0.3, fontSize: "sm" }}
                        color="success"
                    />
                )}
            </Typography>
        </div>
    );
}

export default UserFullNamesControl;