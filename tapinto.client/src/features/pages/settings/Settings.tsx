import { SettingsAccessibilityRounded } from "@mui/icons-material";
import { Button, Card, Divider, Typography } from "@mui/joy";
import { Grid } from "@mui/material";

export default function Settings() {
    return (
        <>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={12}>
                    <Card sx={{ ml: 5, mr: 5, mt: 2, p: 4, boxShadow: "sm" }}>
                        <Typography level="h1" sx={{ fontWeight: "700" }}>
                            <SettingsAccessibilityRounded style={{ marginTop: "-10px", marginRight: "8px" }} />
                            Settings</Typography>
                        <Typography level="title-md">
                            Personalize how your application settings and features are displayed to suit your preferences.
                        </Typography>
                        <Divider />

                        <Button size="sm" variant="outlined" sx={{ mt: 5 }} color="neutral">
                            Cancel
                        </Button>
                        <Button size="sm" variant="solid">
                            Save
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}