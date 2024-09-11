import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";
import { GroupTwoTone } from "@mui/icons-material";

interface Props {
  onLeave: () => void;
  contentOnDiscussion: string;
}

export default function SelectedDiscussion({
  onLeave,
  contentOnDiscussion,
}: Props) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          position: "sticky",
          zIndex: 12,
          left: 0,
          width: "100%",
          right: 0,
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Typography level="title-lg">
            <GroupTwoTone /> &nbsp;
            {contentOnDiscussion}
          </Typography>
          <Button
            sx={{ ml: "auto" }}
            variant="solid"
            color="danger"
            onClick={onLeave}
          >
            Leave chat
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ pt: 0, pb: 0 }}></Box>
    </>
  );
}
