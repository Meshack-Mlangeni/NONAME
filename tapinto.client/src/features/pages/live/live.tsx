import { chats } from "../../../models/ddata";
import MessagesPanel from "./messagesPanel";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";

export default function Live() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={4}>
        <Card sx={{}}>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            spacing={1.5}
            sx={{ mb: 0.25, mr: 0 }}
          >
            <Typography level="title-md">People Who Joined</Typography>
            <Divider />
            <List variant="soft" sx={{ borderRadius: "sm" }}>
              <ListItem>
                <ListItemDecorator>
                  <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                </ListItemDecorator>
                Mabel Boyle
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <ListItemDecorator>
                  <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                </ListItemDecorator>
                Boyd Burt
              </ListItem>
            </List>
          </Stack>
        </Card>
      </Grid>
      <Grid xs={8}>
        <Stack
          direction="column"
          justifyContent="space-between"
          spacing={5}
          sx={{ mb: 0.25 }}
        >
          {/* <SelectedDiscussion
            onLeave={() => {
              toast.success("You have left the chat", { autoClose: 1000 });
              routes.navigate("/home");
            }}
            contentOnDiscussion={
              " We are a community of developers prepping for coding interviews, participate, chat with others and get better at interviewing."
            }
          /> */}
          <MessagesPanel chat={chats[0]} />
        </Stack>
      </Grid>
    </Grid>
  );
}
