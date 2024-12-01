import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { Avatar, AvatarGroup, Input, Sheet, Typography } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useAppSelector } from "../../../app/store/store";
import convertFullNamesToInitials from "../../../helpers/convertFullNameToInitials";

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  discussionQuestion?: string;
  joinedUsers?: { fullnames: string; isLive: boolean }[] | string[];
  onSubmit: () => void;
  onLeave: () => void;
};

export default function MessageInput(props: MessageInputProps) {
  const { user } = useAppSelector((state) => state.account);
  const {
    setTextAreaValue,
    discussionQuestion,
    joinedUsers,
    onSubmit,
    onLeave,
    textAreaValue,
  } = props;

  console.log(joinedUsers);

  const handleClick = () => {
    onSubmit();
    setTextAreaValue("");
  };
  return (
    <Box
      sx={{
        zIndex: 50,
        "--Input-gap": "15px",
        "--Input-radius": "8px",
        "--Input-placeholderOpacity": 7.5,
        "--Input-minHeight": "63px",
        "--Input-paddingInline": "32px",
        borderRadius: "sm",
        p: 1,
        position: "fixed",
        "--Input-decoratorChildHeight": "36px",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Sheet style={{ borderRadius: 7 }} sx={{ p: 2, boxShadow: "sm" }}>
        <Sheet sx={{ mb: 1, ml: 1 }}>
          Question:
          <Typography sx={{ mb: 1 }} level="title-lg">
            {discussionQuestion}
          </Typography>
          {/* <AvatarGroup sx={{ mb: 1.2 }} size="sm">
            {[
              {
                fullnames: user?.firstName + " " + user?.lastName,
                isLive: true,
              },
              ...(joinedUsers ?? []),
            ].map((user) => (
              <Avatar
                color={user.isLive ? "success" : "danger"}
                alt={user.fullnames}
                variant="solid"
              >
                {convertFullNamesToInitials(user.fullnames)}
              </Avatar>
            ))}
          </AvatarGroup> */}
          <AvatarGroup sx={{ mb: 1.5 }} size="sm">
            {(joinedUsers as string[]).map((user) => (
              <Avatar color={"success"} alt={user} variant="solid">
                {convertFullNamesToInitials(user)}
              </Avatar>
            ))}
            <Button
              sx={{ ml: 2, mr: 2 }}
              onClick={() => onLeave()}
              color="danger"
              size="sm"
            >
              Leave Discussion
            </Button>
          </AvatarGroup>
        </Sheet>
        <FormControl>
          <Input
            value={textAreaValue}
            autoComplete={"none"}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                handleClick();
              }
            }}
            endDecorator={
              <Button
                disabled={textAreaValue.length <= 0}
                onClick={handleClick}
                endDecorator={<SendRoundedIcon />}
              >
                Send
              </Button>
            }
            placeholder={`What's your opinion on this ${user?.firstName}...`}
            autoFocus
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
          />
        </FormControl>{" "}
      </Sheet>
    </Box>
  );
}
