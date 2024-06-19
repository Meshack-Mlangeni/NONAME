import { toast } from "react-toastify";
import { chats } from "../../../models/ddata";
import MessagesPanel from "./messagesPanel";
import SelectedDiscussion from "./selectedDiscussion";
import { routes } from "../../../app/router/Routes";
import { Stack } from "@mui/joy";

export default function Live() {
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            spacing={5}
            sx={{ mb: 0.25 }}
        >
            <SelectedDiscussion onLeave={() => {
                toast.success("You have left the chat");
                routes.navigate("/home");
            }}
                contentOnDiscussion={" We are a community of developers prepping for coding interviews, participate, chat with others and get better at interviewing."} />
            <MessagesPanel chat={chats[0]} />
        </Stack>
    );
}