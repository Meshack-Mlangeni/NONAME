import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";

interface Props{
    onLeave: () => void;
}

export default function SelectedDiscussion({onLeave}: Props) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          position: "fixed",
          zIndex: 12,
          top: 0,
          left: 0,
          right: 0,
          boxShadow: "sm"
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Typography level="body-xs">
            We are a community of developers prepping for coding interviews,
            participate, chat with others and get better at interviewing.
          </Typography>
          <Button sx={{ ml: "auto" }} variant="solid" color="danger"
            onClick={onLeave}>
            Leave chat
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ pt: 5, pb: 2 }}></Box>
    </>
  );
}
