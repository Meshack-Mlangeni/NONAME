import { EmailRounded, VerifiedUserRounded } from "@mui/icons-material";
import { Button, Card, Divider, FormControl, FormLabel, Input, Textarea, Typography } from "@mui/joy";
import { Grid } from "@mui/material";

export default function MobileProfilePage() {
    return (
        <>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={12}>
                    <Card sx={{ ml: 5, mr: 5, mt: 2, p: 4, boxShadow: "sm" }}>
                        <Typography level="h1" sx={{ fontWeight: "700" }}>
                            <VerifiedUserRounded style={{ marginTop: "-10px", marginRight: "8px" }} />
                            Personal info</Typography>
                        <Typography level="title-md">
                            Customize how your profile information will appear to the networks.
                        </Typography>

                        <Divider />
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input size="sm" placeholder="First name" />
                            <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size="sm" defaultValue="UI Developer" />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRounded />}
                                placeholder="email"
                                defaultValue="siriwatk@test.com"
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>

                        {/*<ContributionCalendar*/}
                        {/*    includeBoundary={false}*/}
                        {/*    textColor="#1F2328"*/}
                        {/*    cx={13}*/}
                        {/*    cy={13}*/}
                        {/*    cr={4}*/}
                        {/*    style={}*/}
                        {/*    onCellClick={(e, data) => console.log(data)}*/}
                        {/*/>*/}

                        <Typography level="title-md">Bio</Typography>
                        <Typography level="body-sm">
                            Write a short introduction to be displayed on your profile
                        </Typography>

                        <Textarea minRows={2} placeholder={"Update you bio here"} />

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