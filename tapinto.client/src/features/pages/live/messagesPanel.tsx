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
  discussionQuestion: string;
  chats: Chats[];
  usersJoined?: string[];
  onLeave: () => void;
  sendMessage: (message: string) => void;
};

export default function MessagesPanel({
  user,
  chats,
  sendMessage,
  onLeave,
  usersJoined = [],
  discussionQuestion,
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
        <MessageInput
          onLeave={onLeave}
          textAreaValue={textAreaValue}
          discussionQuestion={discussionQuestion}
          setTextAreaValue={setTextAreaValue}
          joinedUsers={usersJoined!}
          onSubmit={() => {
            sendMessage(textAreaValue);
            setTextAreaValue("");
          }}
        />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            px: 1,
            py: 0,
            flexDirection: "column-reverse",
          }}
        >
          <Stack
            spacing={4}
            justifyContent="flex-end"
            sx={{ overflowY: "auto", mb: 32 }}
          >
            {chats.map((chat: Chats, index: number) => {
              const joinOrleftNotification =
                chat.content.includes("has joined") ||
                chat.content.includes("left the discussion");
              const isYou = chat.userEmail === user.email;
              return joinOrleftNotification ? (
                <>
                  <Typography
                    key={"N" + index.toString()}
                    sx={{ alignSelf: "center", m: 2 }}
                    level="title-md"
                  >
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
                      {convertFullNamesToInitials(chat.fullNames)}
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
          <Box sx={{ pt: 5, pb: 5 }}></Box>
        </Box>
      </Sheet>
    </>
  );
}
