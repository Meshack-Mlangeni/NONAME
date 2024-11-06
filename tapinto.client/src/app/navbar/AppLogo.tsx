import { CircularProgress, Typography } from "@mui/joy";
import { useAppSelector } from "../store/store";
import { toast } from "react-toastify";
import { routes } from "../router/Routes";

export default function AppLogo() {
    const { Loading } = useAppSelector((state) => state.app);

    return (
        <>
            <Typography
                level="h4"
                component="div"
                onDoubleClick={() => {
                    if (!Loading) {
                        toast.success("Thank you for choosing MindMeta, Happy learning");
                    }
                }}
                onClick={() => routes.navigate("/home/activity")}
                sx={(theme) => ({
                    position: "relative",
                    top: "0px",
                    fontFamily: "Rockybilly",
                    fontSize: "24px",
                    flexGrow: 1,
                    color: `${theme.palette.text.primary}`,
                })}
            >
                Mind
                {
                    <CircularProgress
                        value={!Loading ? 100 : 40}
                        sx={{
                            ml: 0.5,
                            mr: 0.5,
                            top: 2,
                            "--CircularProgress-trackThickness": "5px",
                            "--CircularProgress-progressThickness": "5px",
                        }}
                        size="sm"
                    />
                }
                Meta
            </Typography>
        </>
    );
}