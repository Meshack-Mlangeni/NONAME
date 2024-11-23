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
  sendMessage: (message: string) => void;
};

export default function MessagesPanel({
  user,
  chats,
  sendMessage,
  discussionQuestion,
}: MessagesPaneProps) {
  const [textAreaValue, setTextAreaValue] = useState("");

  console.log("Chats in messagePanel: ", chats);
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
          textAreaValue={textAreaValue}
          discussionQuestion={discussionQuestion}
          setTextAreaValue={setTextAreaValue}
          joinedUsers={[]}
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
              const joinNotification = chat.content.includes("has joined");
              const isYou = chat.userEmail === user.email;
              return joinNotification ? (
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
