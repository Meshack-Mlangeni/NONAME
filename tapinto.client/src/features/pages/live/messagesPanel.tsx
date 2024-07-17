import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";

import { ChatProps, MessageProps } from "../../../models/types";
import Bubble from "./bubble";
import MessageInput from "./messageInput";
import { Avatar } from "@mui/joy";

type MessagesPaneProps = {
    chat: ChatProps;
};

export default function MessagesPanel(props: MessagesPaneProps) {
    const { chat } = props;
    const [chatMessages, setChatMessages] = React.useState(chat.messages);
    const [textAreaValue, setTextAreaValue] = React.useState("");

    React.useEffect(() => {
        setChatMessages(chat.messages);
    }, [chat.messages]);

    return (
        <>
            <Sheet
                sx={(theme) => ({
                    background: (theme.palette.mode === "dark") ? theme.colorSchemes.dark.palette.background.body : theme.colorSchemes.light.palette.background.body
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
                        {chatMessages.map((message: MessageProps, index: number) => {
                            const isYou = message.sender === "You";
                            return (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={2}
                                    flexDirection={isYou ? "row-reverse" : "row"}
                                >
                                    {message.sender !== "You" && <Avatar />}
                                    <Bubble variant={isYou ? "sent" : "received"} {...message} />
                                </Stack>
                            );
                        })}
                    </Stack>
                </Box>
                <MessageInput
                    textAreaValue={textAreaValue}
                    setTextAreaValue={setTextAreaValue}
                    onSubmit={() => {
                        const newId = chatMessages.length + 1;
                        const newIdString = newId.toString();
                        setChatMessages([
                            ...chatMessages,
                            {
                                id: newIdString,
                                sender: "You",
                                content: textAreaValue,
                                timestamp: "Just now",
                            },
                        ]);
                    }}
                />
                <Box sx={{ pt: 4, pb: 4 }}></Box>
            </Sheet>
        </>
    );
}
