import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Sheet } from "@mui/joy";

export default function Bio() {
  return (
    <Card
      sx={{
        maxWidth: "100%",
      }}
    >
      <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
        <Avatar sx={{ "--Avatar-size": "4rem", mx: "auto" }} />
        <Typography level="title-lg">Meshack Mlangeni</Typography>
        <Typography level="body-sm">
          I started learning React in January and I'm tired!
        </Typography>
        <Sheet
          sx={{
            bgcolor: "background.level1",
            borderRadius: "sm",
            p: 1.5,
            mt: 1,
            display: "flex",
            gap: 2,
            "& > div": { flex: 1 },
          }}
        >
          <div>
            <Typography level="body-xs" fontWeight="lg">
              Posts
            </Typography>
            <Typography fontWeight="lg">00</Typography>
          </div>
          <div>
            <Typography level="body-xs" fontWeight="lg">
              Groups
            </Typography>
            <Typography fontWeight="lg">00</Typography>
          </div>
          <div>
            <Typography level="body-xs" fontWeight="lg">
              Rating
            </Typography>
            <Typography fontWeight="lg">0.0</Typography>
          </div>
        </Sheet>
      </CardContent>
    </Card>
  );
}
