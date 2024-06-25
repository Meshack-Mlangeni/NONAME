import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Divider, List, ListItemButton, ListItemDecorator } from "@mui/joy";
import { Groups2Rounded } from "@mui/icons-material";

export default function MyGroups() {
  return (
    <Card
      sx={{
        mt: 2,
        maxWidth: "100%",
      }}
    >
      <CardContent>
        <Typography level="h3" variant="plain">
          <Groups2Rounded sx={{ position:"relative", top: -3, mr: 2 }} />
          My Group(s)
        </Typography>
        <Divider />
        <List>
          <ListItemButton sx={{borderRadius: 8}}>
            <ListItemDecorator>
              <Avatar size="sm">T1</Avatar>
            </ListItemDecorator>
            Test 1
          </ListItemButton>
          <ListItemButton>
            <ListItemDecorator>
              <Avatar size="sm">T2</Avatar>
            </ListItemDecorator>
            Test 1
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
}
