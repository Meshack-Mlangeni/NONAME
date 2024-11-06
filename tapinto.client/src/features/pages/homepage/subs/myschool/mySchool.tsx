import { SchoolRounded } from "@mui/icons-material";
import { Button, Card, Divider, Typography } from "@mui/joy";

export default function School() {
    return (
        <>

            <Card sx={{ ml: 5, mr: 5, mt: 2, p: 4, boxShadow: "sm" }}>
                <Typography level="h1" sx={{ fontWeight: "700" }}>
                    <SchoolRounded style={{ marginTop: "-10px", marginRight: "8px" }} />
                    Name Of School</Typography>
                <Typography level="title-md">
                    View and manage your high school details, including academic records, extracurricular activities, and personal achievements.
                </Typography>

                <Divider />
                <Button size="sm" variant="solid">
                    Go Home
                </Button>
            </Card>

        </>
    );
}