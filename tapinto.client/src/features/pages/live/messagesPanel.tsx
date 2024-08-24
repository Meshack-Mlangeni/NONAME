import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import MessageInput from "./messageInput";
import { useState } from "react";
import { Chats } from "../../../models/chats";
import { User } from "../../../models/user";
import Bubble from "./bubble";
import { Avatar, Typography } from "@mui/joy";
import convertFullNamesToInitials from "../../../helpers/convertFullNameToInitials";

type MessagesPaneProps = {
  user: User;
  id: number;
  chats: Chats[];
  sendMessage: (message: string) => void;
};

export default function MessagesPanel({
  id,
  user,
  chats,
  sendMessage,
}: MessagesPaneProps) {
  const [textAreaValue, setTextAreaValue] = useState("");

  return (
    <>
      <Sheet
        sx={(theme) => ({
          background:
            theme.palette.mode === "dark"
              ? theme.colorSchemes.dark.palette.background.body
              : theme.colorSchemes.light.palette.background.body,
        })}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            px: 3,
            py: 4,
            flexDirection: "column-reverse",
          }}
        >
          <Stack spacing={4} justifyContent="flex-end">
            {chats.map((chat: Chats, index: number) => {
              const joinNotification = chat.content.includes("has joined");
              const isYou =
                chat.userEmail === user.firstName + " " + user.lastName;
              return joinNotification ? (
                <>
                  <Typography sx={{ alignSelf: "center" }} level="title-md">
                    {chat.content}
                  </Typography>
                </>
              ) : (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  flexDirection={isYou ? "row-reverse" : "row"}
                >
                  {!isYou && (
                    <Avatar alt="User">
                      {convertFullNamesToInitials(
                        chat.userEmail
                      )}
                    </Avatar>
                  )}
                  <Bubble
                    chat={chat}
                    isYou={isYou}
                    variant={isYou ? "sent" : "received"}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Box>
        <MessageInput
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          onSubmit={() => sendMessage(textAreaValue)}
        />
        <Box sx={{ pt: 4, pb: 4 }}></Box>
      </Sheet>
    </>
  );
}
