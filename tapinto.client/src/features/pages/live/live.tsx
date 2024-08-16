import { toast } from "react-toastify";
import { chats } from "../../../models/ddata";
import MessagesPanel from "./messagesPanel";
import SelectedDiscussion from "./selectedDiscussion";
import { routes } from "../../../app/router/Routes";
import { Stack } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../../app/store/store";

export default function Live() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.account);
  //get connection from state
  //

  useEffect(() => {
    //We must find discussion by Id // connection // and messageHistory
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={5}
      sx={{ mb: 0.25 }}
    >
      <SelectedDiscussion
        onLeave={() => {
          toast.success("You have left the chat", { autoClose: 1000 });
          routes.navigate("/home");
        }}
        contentOnDiscussion={
          " We are a community of developers prepping for coding interviews, participate, chat with others and get better at interviewing."
        }
      />
      <MessagesPanel chat={chats[0]} />
    </Stack>
  );
}
