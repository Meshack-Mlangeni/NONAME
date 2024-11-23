import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { Avatar, AvatarGroup, Input, Sheet, Typography } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/store/store";
import convertFullNamesToInitials from "../../../helpers/convertFullNameToInitials";

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  discussionQuestion?: string;
  joinedUsers?: { fullnames: string; isLive: boolean }[];
  onSubmit: () => void;
};

export default function MessageInput(props: MessageInputProps) {
  const { register } = useForm({ mode: "onTouched" });
  const { user } = useAppSelector((state) => state.account);
  const { setTextAreaValue, discussionQuestion, joinedUsers, onSubmit } = props;
  const handleClick = (data: FieldValues) => {
    console.log(data);
    onSubmit();
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
          <AvatarGroup sx={{ mb: 1.2 }} size="sm">
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
          </AvatarGroup>
        </Sheet>
        <FormControl>
          <Input
            autoComplete={"none"}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                handleClick({} as FieldValues);
              }
            }}
            endDecorator={
              <Button onClick={handleClick} endDecorator={<SendRoundedIcon />}>
                Send
              </Button>
            }
            placeholder="What's your opinion..."
            autoFocus
            {...register("message", { required: true })}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
          />
        </FormControl>{" "}
      </Sheet>
    </Box>
  );
}
