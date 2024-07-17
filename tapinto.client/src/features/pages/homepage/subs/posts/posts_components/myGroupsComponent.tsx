import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import {
  Button,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemDecorator,
} from "@mui/joy";
import { Groups2Rounded } from "@mui/icons-material";
import { useAppSelector } from "../../../../../../app/store/store";

export default function MyGroups() {
  const { user } = useAppSelector((state) => state.account);
  const hasGroups = () => {
    if ((user?.groups.length as number) > 0)
      return (
        <List>
          {user?.groups.map((group, index) => (
            <ListItemButton key={index} sx={{ borderRadius: 8 }}>
              <ListItemDecorator>
                <Avatar size="sm" alt={group.groupName}>
                  {group.groupName.charAt(0)}
                </Avatar>
              </ListItemDecorator>
              {group.groupName}{" "}
              {user.email === group.userEmail && (
                <Chip color="success" variant="solid">
                  Group Admin
                </Chip>
              )}
            </ListItemButton>
          ))}
        </List>
      );
    else
      return (
        <>
          <img
            style={{
              display: "block",
              margin: "2px auto 2px",
              height: "128px",
              width: "128px",
            }}
            src="../no-groups.svg"
          />
          <Typography sx={{ textAlign: "center" }} level="body-md">
            You currently not in a group
          </Typography>
        </>
      );
  };
  return (
    user && (
      <Card
        sx={{
          mt: 2,
          maxWidth: "100%",
        }}
      >
        <CardContent>
          <Typography level="h3" variant="plain">
            <Groups2Rounded sx={{ position: "relative", top: -3, mr: 2 }} />
            My Group(s)
          </Typography>
          <Divider />
          {hasGroups()}
          <Button sx={{ mt: 2 }}>Join Group(s)</Button>
        </CardContent>
      </Card>
    )
  );
}
